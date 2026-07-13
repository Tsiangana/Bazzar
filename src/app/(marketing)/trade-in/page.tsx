import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FaqList } from '@/components/features/FaqList';
import { faqs } from '@/lib/data/faqs';
import { catalogProducts, lifestyleImages } from '@/lib/data/products';
import { formatKz } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Trade-In',
  description:
    'Troca o teu iPhone atual por um novo: o valor avaliado é descontado na compra.',
};

const steps = [
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

const highlights = [
  { icon: '⚡', label: 'Estimativa imediata' },
  { icon: '🛡', label: 'Garantia de 12 meses no novo' },
  { icon: '💸', label: 'Desconto direto na compra' },
];

const tradeInFaqs = faqs.filter((f) =>
  ['Como funciona o Trade-In?', 'Qual é a diferença entre um iPhone remodelado e um novo?', 'Como sei que o dispositivo vai funcionar bem?'].includes(f.q),
);

export default function TradeInPage() {
  const novo = catalogProducts.find((p) => p.id === 'iphone-16') ?? catalogProducts[0];
  const antigo = catalogProducts.find((p) => p.id === 'iphone-13') ?? catalogProducts[1];
  const tradeValue = Math.round(antigo.price * 0.8);

  return (
    <main className="flex-1 bg-page pb-20">
      {/* Hero */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-emerald-950 sm:min-h-[340px]">
        <Image
          src={lifestyleImages.categories.tradeIn}
          alt="Trade-In de iPhone"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 from-0% via-emerald-900/60 via-35% to-transparent to-60%" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-10">
          <div className="max-w-md">
            <h1 className="font-display text-3xl leading-[1.1] font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              O teu iPhone antigo
              <br />
              vale um <i className="font-light">novo</i>.
            </h1>
            <p className="mt-3 text-sm text-white/80 sm:text-base">
              Entrega o teu iPhone atual e paga apenas a diferença.
            </p>
            <Link
              href="/trade-in/comecar"
              className="mt-5 inline-flex h-10 items-center rounded-lg bg-white px-5 font-accent text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 sm:h-11 sm:text-[15px]"
            >
              Começar o Trade-In
            </Link>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16">
        <h2 className="text-xl font-semibold">Como funciona</h2>
        <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="text-[15px] font-semibold">{step.title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Exemplo de poupança */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col justify-center gap-4 bg-accent p-8">
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Faz as contas.
            </h2>
            <p className="text-zinc-900">
              Um exemplo real: troca o teu {antigo.name} por um {novo.name} e
              vê quanto pagas de facto.
            </p>
            <Link
              href="/trade-in/comecar"
              className="inline-flex h-11 w-fit items-center rounded-lg bg-zinc-950 px-6 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              Ver catálogo
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-4 bg-white p-8">
            <dl className="flex flex-col gap-3 text-[15px]">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-zinc-700">{novo.name} remodelado</dt>
                <dd className="font-accent font-bold">{formatKz(novo.price)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-zinc-700">
                  Trade-in do teu {antigo.name}
                  <span className="ml-2 rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                    estimativa
                  </span>
                </dt>
                <dd className="font-accent font-bold text-emerald-700">
                  −{formatKz(tradeValue)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-3">
                <dt className="font-semibold">Pagas apenas</dt>
                <dd className="font-accent text-2xl font-bold tracking-tight">
                  {formatKz(novo.price - tradeValue)}
                </dd>
              </div>
            </dl>
            <p className="text-xs text-zinc-500">
              Valores de exemplo. A estimativa final depende do estado do teu
              equipamento, confirmado na inspeção técnica.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 pt-16">
        <h2 className="text-2xl font-semibold">Perguntas frequentes.</h2>
        <FaqList faqs={tradeInFaqs} />
      </section>
    </main>
  );
}
