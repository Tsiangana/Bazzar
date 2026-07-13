'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { ProductCard } from '@/components/features/products/ProductCard';
import type { CatalogProduct } from '@/lib/data/products';
import { formatKz } from '@/lib/utils/format';

const storages = [
  { label: '128 GB', factor: 1 },
  { label: '256 GB', factor: 1.08 },
  { label: '512 GB', factor: 1.15 },
];

const conditions = [
  {
    label: 'Como novo',
    text: 'Sem qualquer marca de uso. Parece acabado de sair da caixa.',
    factor: 1,
  },
  {
    label: 'Bom',
    text: 'Pequenas marcas de uso, mas sem riscos visíveis a um braço de distância.',
    factor: 0.85,
  },
  {
    label: 'Razoável',
    text: 'Riscos visíveis no ecrã ou na traseira, mas o vidro está intacto.',
    factor: 0.7,
  },
  {
    label: 'Danificado',
    text: 'Ecrã ou traseira com fissuras, ou algum componente não funciona.',
    factor: 0.45,
  },
];

const batteries = [
  { label: '85% ou mais', text: 'Bateria saudável', factor: 1 },
  { label: 'Menos de 85%', text: 'Bateria desgastada', factor: 0.92 },
  { label: 'Não sei', text: 'Confirmamos na inspeção', factor: 0.96 },
];

const extras = [
  { id: 'caixa', label: 'Tenho a caixa original', factor: 0.02 },
  { id: 'carregador', label: 'Tenho o carregador / cabo', factor: 0.02 },
  { id: 'faceid', label: 'O Face ID / Touch ID funciona', factor: 0.04 },
];

const stepMeta = [
  {
    title: 'Escolhe o teu próximo iPhone',
    text: 'Navega no catálogo e escolhe o modelo que queres a seguir.',
  },
  {
    title: 'Avalia o teu iPhone atual',
    text: 'Descreve o estado do equipamento e recebe uma estimativa na hora.',
  },
  {
    title: 'Envia para inspeção',
    text: 'A nossa equipa técnica confirma o estado e valida o valor.',
  },
  {
    title: 'Paga só a diferença',
    text: 'O valor do teu iPhone antigo é descontado diretamente na compra.',
  },
];

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {stepMeta.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.title} className="flex flex-1 items-center gap-2 sm:gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${done
                ? 'bg-emerald-600 text-white'
                : active
                  ? 'bg-zinc-950 text-white'
                  : 'bg-zinc-200 text-zinc-500'
                }`}
            >
              {done ? <CheckIcon /> : i + 1}
            </span>
            <span
              className={`hidden flex-1 text-sm font-medium lg:block ${active ? 'text-zinc-950' : 'text-zinc-500'
                }`}
            >
              {step.title}
            </span>
            {i < stepMeta.length - 1 ? (
              <span
                aria-hidden
                className={`h-0.5 flex-1 rounded-full transition-colors lg:max-w-8 ${done ? 'bg-emerald-600' : 'bg-zinc-200'
                  }`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function OptionCard({
  label,
  text,
  selected,
  onSelect,
  right,
}: {
  label: string;
  text?: string;
  selected: boolean;
  onSelect: () => void;
  right?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-colors ${selected
        ? 'border-zinc-950 bg-selected'
        : 'border-zinc-200 bg-white hover:border-zinc-400'
        }`}
    >
      <span className="flex items-start gap-3">
        <span
          aria-hidden
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-zinc-950' : 'border-zinc-400'
            }`}
        >
          {selected ? <span className="h-2.5 w-2.5 rounded-full bg-zinc-950" /> : null}
        </span>
        <span>
          <span className="block font-semibold">{label}</span>
          {text ? (
            <span className="mt-0.5 block text-sm text-zinc-600">{text}</span>
          ) : null}
        </span>
      </span>
      {right}
    </button>
  );
}

export function TradeInWizard({ products }: { products: CatalogProduct[] }) {
  const [step, setStep] = useState(0);
  const [newPhoneId, setNewPhoneId] = useState<string | null>(null);
  const [oldPhoneId, setOldPhoneId] = useState<string | null>(null);
  const [storage, setStorage] = useState(0);
  const [condition, setCondition] = useState(1);
  const [battery, setBattery] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([
    'caixa',
    'carregador',
    'faceid',
  ]);

  const newPhone = products.find((p) => p.id === newPhoneId) ?? null;
  const oldPhone = products.find((p) => p.id === oldPhoneId) ?? null;

  const estimate = useMemo(() => {
    if (!oldPhone) return 0;
    const base = oldPhone.price * 0.8;
    const extrasFactor =
      1 +
      extras
        .filter((e) => selectedExtras.includes(e.id))
        .reduce((sum, e) => sum + e.factor, 0);
    const value =
      base *
      storages[storage].factor *
      conditions[condition].factor *
      batteries[battery].factor *
      extrasFactor;
    return Math.round(value / 1000) * 1000;
  }, [oldPhone, storage, condition, battery, selectedExtras]);

  const difference = newPhone ? Math.max(0, newPhone.price - estimate) : 0;

  const canContinue =
    (step === 0 && Boolean(newPhone)) ||
    (step === 1 && Boolean(oldPhone)) ||
    step === 2 ||
    step === 3;

  function toggleExtra(id: string) {
    setSelectedExtras((current) =>
      current.includes(id) ? current.filter((e) => e !== id) : [...current, id],
    );
  }

  function goNext() {
    setStep((s) => Math.min(stepMeta.length - 1, s + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      {/* Progresso */}
      <Stepper current={step} />

      {/* Cabeçalho do passo */}
      <header className="mt-10">
        <p className="font-accent text-sm font-semibold tracking-wide text-zinc-500 uppercase">
          Passo {step + 1} de {stepMeta.length}
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          {stepMeta[step].title}
        </h1>
        <p className="mt-2 text-[15px] text-zinc-600">{stepMeta[step].text}</p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        {/* Conteúdo do passo */}
        <div>
          {/* Passo 1 — escolher o novo iPhone */}
          {step === 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selected={product.id === newPhoneId}
                  onSelect={() => setNewPhoneId(product.id)}
                />
              ))}
            </div>
          ) : null}

          {/* Passo 2 — avaliar o iPhone atual */}
          {step === 1 ? (
            <div className="flex flex-col gap-8">
              <section>
                <h2 className="text-lg font-semibold">Qual é o teu modelo atual?</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {products.map((product) => {
                    const selected = product.id === oldPhoneId;
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => setOldPhoneId(product.id)}
                        className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${selected
                          ? 'border-zinc-950 bg-selected'
                          : 'border-zinc-200 bg-white hover:border-zinc-400'
                          }`}
                      >
                        {product.name}
                      </button>
                    );
                  })}
                </div>
              </section>

              {oldPhone ? (
                <>
                  <section>
                    <h2 className="text-lg font-semibold">Capacidade</h2>
                    <div className="mt-4 flex flex-col gap-3">
                      {storages.map((option, i) => (
                        <OptionCard
                          key={option.label}
                          label={option.label}
                          selected={storage === i}
                          onSelect={() => setStorage(i)}
                        />
                      ))}
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold">Estado do equipamento</h2>
                    <div className="mt-4 flex flex-col gap-3">
                      {conditions.map((option, i) => (
                        <OptionCard
                          key={option.label}
                          label={option.label}
                          text={option.text}
                          selected={condition === i}
                          onSelect={() => setCondition(i)}
                        />
                      ))}
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold">Saúde da bateria</h2>
                    <div className="mt-4 flex flex-col gap-3">
                      {batteries.map((option, i) => (
                        <OptionCard
                          key={option.label}
                          label={option.label}
                          text={option.text}
                          selected={battery === i}
                          onSelect={() => setBattery(i)}
                        />
                      ))}
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg font-semibold">Mais alguma coisa?</h2>
                    <div className="mt-4 flex flex-col gap-3">
                      {extras.map((extra) => {
                        const checked = selectedExtras.includes(extra.id);
                        return (
                          <button
                            key={extra.id}
                            type="button"
                            onClick={() => toggleExtra(extra.id)}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-4 text-left font-semibold transition-colors ${checked
                              ? 'border-zinc-950 bg-selected'
                              : 'border-zinc-200 bg-white hover:border-zinc-400'
                              }`}
                          >
                            <span
                              aria-hidden
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${checked
                                ? 'border-zinc-950 bg-zinc-950 text-white'
                                : 'border-zinc-300 bg-white'
                                }`}
                            >
                              {checked ? <CheckIcon className="h-3.5 w-3.5" /> : null}
                            </span>
                            {extra.label}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </>
              ) : (
                <p className="rounded-xl bg-trust px-5 py-4 text-[15px]">
                  Escolhe o teu modelo atual para continuares a avaliação.
                </p>
              )}
            </div>
          ) : null}

          {/* Passo 3 — envio para inspeção */}
          {step === 2 ? (
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-trust px-6 py-5 text-[15px] leading-7">
                A estimativa acima é baseada no que nos disseste. Depois de
                enviares o equipamento, a nossa equipa técnica faz uma inspeção
                de 25 pontos e confirma o valor. Se tudo corresponder, o valor
                mantém-se e o desconto é aplicado na tua compra.
              </div>

              <ol className="flex flex-col gap-3">
                {[
                  'Embalamos e enviamos-te uma etiqueta de envio gratuita',
                  'Entregas o equipamento num ponto de recolha ou pedes levantamento',
                  'Fazemos a inspeção técnica em 48 horas',
                  'Confirmamos o valor (ou ajustamos, se o estado for diferente)',
                ].map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[15px] font-medium">{item}</span>
                  </li>
                ))}
              </ol>

              <p className="text-sm text-zinc-600">
                Se a inspeção revelar um estado diferente do descrito,
                contactamos-te com o novo valor. Podes aceitar ou receber o teu
                equipamento de volta, sem custos.
              </p>
            </div>
          ) : null}

          {/* Passo 4 — pagar a diferença */}
          {step === 3 ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 rounded-2xl bg-emerald-50 px-6 py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-emerald-900">
                    Trade-In registado com sucesso
                  </p>
                  <p className="text-sm text-emerald-800">
                    Enviámos-te a etiqueta de envio por e-mail. Assim que
                    recebermos e inspecionarmos o equipamento, confirmamos o
                    valor final.
                  </p>
                </div>
              </div>

              {newPhone && oldPhone ? (
                <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                  <h2 className="text-lg font-semibold">O que vais pagar</h2>
                  <dl className="mt-4 flex flex-col gap-3 text-[15px]">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-zinc-700">{newPhone.name} remodelado</dt>
                      <dd className="font-accent font-bold">
                        {formatKz(newPhone.price)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-zinc-700">
                        Trade-in do teu {oldPhone.name}
                      </dt>
                      <dd className="font-accent font-bold text-emerald-700">
                        −{formatKz(estimate)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-3">
                      <dt className="font-semibold">Pagas apenas</dt>
                      <dd className="font-accent text-2xl font-bold tracking-tight">
                        {formatKz(difference)}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={`/comprar/${newPhone.id}`}
                    className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-zinc-950 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
                  >
                    Continuar para a compra
                  </Link>
                  <p className="mt-4 text-center text-sm text-zinc-600">
                    Envio gratuito · 30 dias para devolução · 12 meses de garantia
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Resumo lateral */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-40 lg:self-start">
          {step < 3 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-950 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              {step === 2 ? 'Confirmar Trade-In' : 'Continuar'}
            </button>
          ) : null}

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Resumo</h2>

            <dl className="mt-4 flex flex-col gap-3 text-[15px]">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-zinc-600">Novo iPhone</dt>
                <dd className="text-right font-medium">
                  {newPhone ? (
                    <>
                      {newPhone.name}
                      <span className="block font-accent font-bold">
                        {formatKz(newPhone.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-zinc-400">Por escolher</span>
                  )}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4 border-t border-zinc-100 pt-3">
                <dt className="text-zinc-600">O teu iPhone</dt>
                <dd className="text-right font-medium">
                  {oldPhone ? (
                    <>
                      {oldPhone.name}
                      <span className="block text-sm text-zinc-500">
                        {storages[storage].label} · {conditions[condition].label}
                      </span>
                    </>
                  ) : (
                    <span className="text-zinc-400">Por avaliar</span>
                  )}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-zinc-100 pt-3">
                <dt className="flex items-center gap-2 text-zinc-600">
                  Estimativa
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                    imediata
                  </span>
                </dt>
                <dd className="font-accent font-bold text-emerald-700">
                  {oldPhone ? `−${formatKz(estimate)}` : '—'}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-3">
                <dt className="font-semibold">Pagas apenas</dt>
                <dd className="font-accent text-2xl font-bold tracking-tight">
                  {newPhone ? formatKz(difference) : '—'}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-zinc-500">
              A estimativa depende do estado do teu equipamento e é confirmada
              na inspeção técnica.
            </p>
          </div>
        </aside>
      </div>

      {/* Navegação */}
      <div className="mt-10 flex items-center">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="flex h-12 cursor-pointer items-center gap-2 rounded-lg px-5 text-[15px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
            Voltar
          </button>
        ) : (
          <Link
            href="/trade-in"
            className="flex h-12 items-center gap-2 rounded-lg px-5 text-[15px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
            Cancelar
          </Link>
        )}
      </div>
    </div>
  );
}
