import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { lifestyleImages } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'Trade-In',
  description:
    'Troca o teu iPhone atual por um novo: o valor avaliado é descontado na compra.',
};

const steps = [
  'Escolhe o novo iPhone no catálogo',
  'Descreve o estado do teu equipamento atual',
  'Recebe uma estimativa imediata',
  'Envia o dispositivo para inspeção',
  'A empresa confirma ou ajusta a avaliação',
  'O valor é descontado na compra do novo iPhone',
];

export default function TradeInPage() {
  return (
    <main className="flex-1 bg-page pb-20">
      {/* Hero */}
      <section className="bg-accent">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl">
              O teu iPhone antigo
              <br />
              vale um <i className="font-light">novo</i>.
            </h1>
            <p className="mt-5 text-lg text-zinc-900">
              Entrega o teu iPhone atual e paga apenas a diferença.
            </p>
            <Link
              href="/comprar"
              className="mt-7 inline-flex h-13 items-center rounded-lg bg-zinc-950 px-7 text-[17px] font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              Começar o Trade-In
            </Link>
          </div>
          <div className="relative mx-auto h-72 w-full max-w-lg">
            <Image
              src={lifestyleImages.categories.tradeIn}
              alt="Trade-In de iPhone"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 512px"
              className="rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 className="font-display text-4xl font-medium tracking-tight">
          Como funciona
        </h2>
        <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-[15px] font-medium">{step}</span>
            </li>
          ))}
        </ol>
        {/* TODO: formulário de avaliação (modelo, capacidade, bateria, ecrã,
            traseira, Face ID, câmara, botões, danos, caixa, carregador) */}
      </section>
    </main>
  );
}
