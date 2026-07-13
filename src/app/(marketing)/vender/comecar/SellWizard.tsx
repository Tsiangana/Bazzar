'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

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

/** Percentagem do preço de revenda que a empresa paga numa compra direta. */
const DIRECT_RATE = 0.65;
/** Comissão da plataforma sobre o valor arrematado em leilão. */
const AUCTION_FEE = 0.1;

type Mode = 'direta' | 'leilao';

const stepMeta = [
  {
    title: 'Escolhe o teu iPhone',
    text: 'Diz-nos que modelo queres vender.',
  },
  {
    title: 'Descreve o estado atual',
    text: 'Quanto mais fiel for a descrição, mais próxima é a estimativa.',
  },
  {
    title: 'Escolhe como queres vender',
    text: 'Venda direta com valor garantido, ou leilão na plataforma.',
  },
  {
    title: 'Pedido enviado',
    text: 'Recebemos o teu pedido e tratamos do resto.',
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
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                done
                  ? 'bg-indigo-600 text-white'
                  : active
                    ? 'bg-zinc-950 text-white'
                    : 'bg-zinc-200 text-zinc-500'
              }`}
            >
              {done ? <CheckIcon /> : i + 1}
            </span>
            <span
              className={`hidden flex-1 text-sm font-medium lg:block ${
                active ? 'text-zinc-950' : 'text-zinc-500'
              }`}
            >
              {step.title}
            </span>
            {i < stepMeta.length - 1 ? (
              <span
                aria-hidden
                className={`h-0.5 flex-1 rounded-full transition-colors lg:max-w-8 ${
                  done ? 'bg-indigo-600' : 'bg-zinc-200'
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
}: {
  label: string;
  text?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-colors ${
        selected
          ? 'border-zinc-950 bg-selected'
          : 'border-zinc-200 bg-white hover:border-zinc-400'
      }`}
    >
      <span className="flex items-start gap-3">
        <span
          aria-hidden
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
            selected ? 'border-zinc-950' : 'border-zinc-400'
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
    </button>
  );
}

export function SellWizard({ products }: { products: CatalogProduct[] }) {
  const [step, setStep] = useState(0);
  const [phoneId, setPhoneId] = useState<string | null>(null);
  const [storage, setStorage] = useState(0);
  const [condition, setCondition] = useState(1);
  const [battery, setBattery] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([
    'caixa',
    'carregador',
    'faceid',
  ]);
  const [mode, setMode] = useState<Mode | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const product = products.find((p) => p.id === phoneId) ?? null;

  /** Valor garantido numa venda direta à iphonesAO. */
  const directValue = useMemo(() => {
    if (!product) return 0;
    const extrasFactor =
      1 +
      extras
        .filter((e) => selectedExtras.includes(e.id))
        .reduce((sum, e) => sum + e.factor, 0);
    const value =
      product.price *
      DIRECT_RATE *
      storages[storage].factor *
      conditions[condition].factor *
      batteries[battery].factor *
      extrasFactor;
    return Math.round(value / 1000) * 1000;
  }, [product, storage, condition, battery, selectedExtras]);

  /** Em leilão o valor final é decidido pelos licitantes — mostramos um intervalo. */
  const auctionMin = Math.round((directValue * 1.05 * (1 - AUCTION_FEE)) / 1000) * 1000;
  const auctionMax = Math.round((directValue * 1.4 * (1 - AUCTION_FEE)) / 1000) * 1000;

  const contactValid = name.trim().length > 1 && phone.replace(/\D/g, '').length >= 9;

  const canContinue =
    (step === 0 && Boolean(product)) ||
    step === 1 ||
    (step === 2 && Boolean(mode) && contactValid);

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
          {/* Passo 1 — escolher o modelo */}
          {step === 0 ? (
            <section>
              <h2 className="text-lg font-semibold">Qual é o teu modelo atual?</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {products.map((item) => {
                  const selected = item.id === phoneId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPhoneId(item.id)}
                      className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                        selected
                          ? 'border-zinc-950 bg-selected'
                          : 'border-zinc-200 bg-white hover:border-zinc-400'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </section>
          ) : null}

          {/* Passo 2 — descrever o estado */}
          {step === 1 ? (
            <div className="flex flex-col gap-8">
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
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-5 py-4 text-left font-semibold transition-colors ${
                          checked
                            ? 'border-zinc-950 bg-selected'
                            : 'border-zinc-200 bg-white hover:border-zinc-400'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                            checked
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
            </div>
          ) : null}

          {/* Passo 3 — modalidade de venda + contacto */}
          {step === 2 ? (
            <div className="flex flex-col gap-8">
              <section>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setMode('direta')}
                    className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-6 text-left transition-colors ${
                      mode === 'direta'
                        ? 'border-zinc-950 bg-selected'
                        : 'border-zinc-200 bg-white hover:border-zinc-400'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-accent text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                        Venda direta
                      </span>
                      <span className="rounded bg-zinc-950 px-2 py-0.5 text-xs font-semibold text-white">
                        garantido
                      </span>
                    </span>
                    <span className="font-accent text-2xl font-bold tracking-tight">
                      {formatKz(directValue)}
                    </span>
                    <span className="text-sm leading-6 text-zinc-600">
                      A iphonesAO compra o teu iPhone. Valor fixo, sem espera:
                      recebes o pagamento assim que a inspeção confirmar o
                      estado.
                    </span>
                    <span className="mt-1 flex flex-col gap-1 text-sm text-zinc-700">
                      <span>· Pagamento em até 48h após a inspeção</span>
                      <span>· Sem comissões</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('leilao')}
                    className={`flex cursor-pointer flex-col gap-3 rounded-2xl border p-6 text-left transition-colors ${
                      mode === 'leilao'
                        ? 'border-zinc-950 bg-selected'
                        : 'border-zinc-200 bg-white hover:border-zinc-400'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-accent text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                        Leilão na plataforma
                      </span>
                      <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
                        podes ganhar mais
                      </span>
                    </span>
                    <span className="font-accent text-2xl font-bold tracking-tight">
                      {formatKz(auctionMin)}
                      <span className="text-zinc-400"> – </span>
                      {formatKz(auctionMax)}
                    </span>
                    <span className="text-sm leading-6 text-zinc-600">
                      Nós tratamos de tudo: fotografamos, publicamos e gerimos o
                      leilão por ti. O valor final é decidido pelos licitantes.
                    </span>
                    <span className="mt-1 flex flex-col gap-1 text-sm text-zinc-700">
                      <span>· Leilão de 7 dias</span>
                      <span>· Comissão de {AUCTION_FEE * 100}% já descontada</span>
                    </span>
                  </button>
                </div>

                <p className="mt-4 text-sm text-zinc-600">
                  Ainda estás a decidir? Na venda direta sabes exatamente quanto
                  recebes. No leilão o valor é uma estimativa — pode subir acima
                  do intervalo, mas também pode ficar-se pelo mínimo.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">Como te contactamos?</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-zinc-700">
                      Nome completo
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="O teu nome"
                      className="h-12 rounded-xl border border-zinc-200 bg-white px-4 text-[15px] outline-none transition-colors focus:border-zinc-950"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-zinc-700">
                      Telemóvel
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+244 900 000 000"
                      className="h-12 rounded-xl border border-zinc-200 bg-white px-4 text-[15px] outline-none transition-colors focus:border-zinc-950"
                    />
                  </label>
                </div>
                <p className="mt-3 text-sm text-zinc-500">
                  Usamos os teus dados apenas para combinar a recolha do
                  equipamento.
                </p>
              </section>
            </div>
          ) : null}

          {/* Passo 4 — pedido enviado */}
          {step === 3 ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 rounded-2xl bg-indigo-50 px-6 py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-indigo-900">
                    Pedido de venda registado
                  </p>
                  <p className="text-sm text-indigo-800">
                    {mode === 'leilao'
                      ? 'Vamos recolher o teu iPhone, fotografá-lo e colocá-lo em leilão na plataforma.'
                      : 'Vamos recolher o teu iPhone e confirmar o valor na inspeção técnica.'}
                  </p>
                </div>
              </div>

              {product ? (
                <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                  <h2 className="text-lg font-semibold">O teu pedido</h2>
                  <dl className="mt-4 flex flex-col gap-3 text-[15px]">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-zinc-700">Equipamento</dt>
                      <dd className="font-medium">
                        {product.name} · {storages[storage].label}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-zinc-700">Estado declarado</dt>
                      <dd className="font-medium">{conditions[condition].label}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-zinc-700">Modalidade</dt>
                      <dd className="font-medium">
                        {mode === 'leilao' ? 'Leilão na plataforma' : 'Venda direta'}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-3">
                      <dt className="font-semibold">
                        {mode === 'leilao' ? 'Vais receber (estimado)' : 'Vais receber'}
                      </dt>
                      <dd className="font-accent text-2xl font-bold tracking-tight text-indigo-700">
                        {mode === 'leilao'
                          ? `${formatKz(auctionMin)} – ${formatKz(auctionMax)}`
                          : formatKz(directValue)}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : null}

              <ol className="flex flex-col gap-3">
                {[
                  'Ligamos-te para combinar a recolha do equipamento',
                  'A nossa equipa faz a inspeção técnica de 25 pontos',
                  mode === 'leilao'
                    ? 'Publicamos o leilão e acompanhas as licitações em direto'
                    : 'Confirmamos o valor e o pagamento entra na tua conta',
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

              <div className="flex flex-wrap gap-3">
                <Link
                  href={mode === 'leilao' ? '/leiloes' : '/comprar'}
                  className="flex h-12 items-center rounded-lg bg-zinc-950 px-7 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
                >
                  {mode === 'leilao' ? 'Ver leilões a decorrer' : 'Ver o catálogo'}
                </Link>
                <Link
                  href="/vender"
                  className="flex h-12 items-center rounded-lg border border-zinc-200 bg-white px-7 text-[15px] font-semibold text-zinc-800 transition-colors hover:border-zinc-400"
                >
                  Voltar a vender
                </Link>
              </div>

              <p className="text-sm text-zinc-600">
                Se a inspeção revelar um estado diferente do descrito,
                contactamos-te com o novo valor. Podes aceitar ou receber o teu
                equipamento de volta, sem custos.
              </p>
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
              {step === 2 ? 'Confirmar pedido' : 'Continuar'}
            </button>
          ) : null}

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Resumo</h2>

            <dl className="mt-4 flex flex-col gap-3 text-[15px]">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-zinc-600">O teu iPhone</dt>
                <dd className="text-right font-medium">
                  {product ? (
                    <>
                      {product.name}
                      <span className="block text-sm text-zinc-500">
                        {storages[storage].label} · {conditions[condition].label}
                      </span>
                    </>
                  ) : (
                    <span className="text-zinc-400">Por escolher</span>
                  )}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4 border-t border-zinc-100 pt-3">
                <dt className="text-zinc-600">Modalidade</dt>
                <dd className="text-right font-medium">
                  {mode ? (
                    mode === 'leilao' ? 'Leilão' : 'Venda direta'
                  ) : (
                    <span className="text-zinc-400">Por escolher</span>
                  )}
                </dd>
              </div>

              <div className="border-t border-zinc-200 pt-3">
                <dt className="flex items-center gap-2 font-semibold">
                  Vais receber
                  <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
                    estimativa
                  </span>
                </dt>
                <dd className="mt-1 font-accent text-2xl font-bold tracking-tight text-indigo-700">
                  {!product ? (
                    <span className="text-zinc-400">—</span>
                  ) : mode === 'leilao' ? (
                    <>
                      {formatKz(auctionMin)}
                      <span className="text-zinc-400"> – </span>
                      {formatKz(auctionMax)}
                    </>
                  ) : (
                    formatKz(directValue)
                  )}
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
      {step < 3 ? (
        <div className="mt-10 flex items-center">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex h-12 cursor-pointer items-center gap-2 rounded-lg px-5 text-[15px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              ← Voltar
            </button>
          ) : (
            <Link
              href="/vender"
              className="flex h-12 items-center gap-2 rounded-lg px-5 text-[15px] font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
            >
              ← Cancelar
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}
