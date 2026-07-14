import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FaqList } from '@/components/features/FaqList';
import { faqs } from '@/lib/data/faqs';
import { lifestyleImages } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'Como Funciona',
  description:
    'Todo o processo passa pela empresa: qualidade, garantia, inspeção técnica e segurança.',
};

const guarantees = [
  ['Qualidade', 'Todos os equipamentos passam pela nossa inspeção de 25 pontos.'],
  ['Preços consistentes', 'Valores definidos por critérios técnicos, não por regateio.'],
  ['Garantia de 12 meses', 'Incluída em todas as compras, sem custos extra.'],
  ['Inspeção técnica', 'Feita por especialistas em iPhone, com relatório publicado.'],
  ['Transparência', 'Sabes sempre o estado real do equipamento antes de comprar.'],
  ['Segurança', 'Nunca negoceias com estranhos — só com a empresa.'],
] as const;

const phases = [
  {
    label: 'O teu iPhone antigo',
    steps: [
      'Tens um iPhone que queres trocar ou vender',
      'Pedes uma avaliação na plataforma',
      'Recebes uma estimativa imediata',
      'Envias o equipamento para a empresa',
    ],
  },
  {
    label: 'Nos bastidores',
    steps: [
      'Inspeção técnica de 25 pontos',
      'Limpeza e reparação, se necessário',
      'Classificação e fotografia',
      'Entrada em stock',
    ],
  },
  {
    label: 'Uma segunda vida',
    steps: [
      'Venda direta no catálogo ou leilão',
      'Um novo dono recebe o iPhone com garantia',
    ],
  },
];

const services = [
  { title: 'Comprar', text: 'iPhones remodelados com garantia.', href: '/comprar' },
  { title: 'Trade-In', text: 'Troca o antigo e paga a diferença.', href: '/trade-in' },
  { title: 'Vender', text: 'Avaliação justa e pagamento rápido.', href: '/vender' },
  { title: 'Leilões', text: 'Modelos raros, o maior lance vence.', href: '/leiloes' },
];

export default function ComoFuncionaPage() {
  return (
    <main className="flex-1 bg-page pb-20">
      {/* Hero */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-zinc-950 sm:min-h-[340px]">
        <Image
          src={lifestyleImages.hero}
          alt="Como funciona a iphonesAO"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 from-0% via-zinc-900/60 via-35% to-transparent to-60%" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-10">
          <div className="max-w-md">
            <h1 className="font-display text-3xl leading-[1.1] font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Só existem dois:
              <br />
              <i className="font-light">tu e a empresa</i>.
            </h1>
            <p className="mt-3 text-sm text-white/80 sm:text-base">
              Todo o processo passa por nós. Nunca negoceias com outro cliente
              — e é isso que garante a qualidade.
            </p>
          </div>
        </div>
      </section>

      {/* Garantias */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16">
        <h2 className="text-xl font-semibold">O que isso te garante</h2>
        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map(([title, text]) => (
            <li
              key={title}
              className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-sm text-white"
              >
                ✓
              </span>
              <h3 className="mt-1 text-[15px] font-semibold">{title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Ciclo de vida */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16">
        <div className="rounded-2xl bg-beige px-8 py-12 lg:px-10">
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            O ciclo de vida de um{' '}
            <i className="underline decoration-accent decoration-8 underline-offset-4">
              iPhone
            </i>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-700">
            Acompanhamos todo o percurso do equipamento, desde o antigo
            proprietário até ao novo.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {phases.map((phase, phaseIndex) => {
              const offset = phases
                .slice(0, phaseIndex)
                .reduce((sum, p) => sum + p.steps.length, 0);
              return (
                <div key={phase.label} className="flex flex-col gap-4">
                  <h3 className="font-accent text-sm font-bold tracking-wide text-zinc-500 uppercase">
                    {phase.label}
                  </h3>
                  <ol className="flex flex-col gap-3">
                    {phase.steps.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-center gap-4 rounded-xl bg-white p-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                          {offset + i + 1}
                        </span>
                        <span className="text-[15px] font-medium text-zinc-800">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16">
        <h2 className="text-xl font-semibold">Por onde queres começar?</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col gap-2 rounded-2xl bg-accent p-6 transition-transform hover:-translate-y-0.5"
            >
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-zinc-800">{service.text}</p>
              <span className="mt-2 font-accent text-sm font-semibold group-hover:underline">
                Explorar →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 pt-16">
        <h2 className="text-2xl font-semibold">Perguntas frequentes.</h2>
        <FaqList faqs={faqs} />
      </section>
    </main>
  );
}
