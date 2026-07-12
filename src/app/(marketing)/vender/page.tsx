import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FaqList } from '@/components/features/FaqList';
import { faqs } from '@/lib/data/faqs';
import { lifestyleImages } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'Avaliar e Vender',
  description:
    'Vende o teu iPhone diretamente à empresa: avaliação, inspeção e pagamento rápido.',
};

const benefits = [
  {
    title: 'Sem estranhos',
    text: 'Vendes diretamente à empresa — sem encontros, sem regatear, sem riscos.',
  },
  {
    title: 'Avaliação técnica justa',
    text: 'O valor é definido por uma inspeção técnica transparente, não por palpite.',
  },
  {
    title: 'Pagamento garantido',
    text: 'Assim que o valor é confirmado, recebes o pagamento diretamente.',
  },
];

const steps = [
  {
    title: 'Pede uma avaliação',
    text: 'Diz-nos o modelo, a capacidade e o estado do teu iPhone.',
  },
  {
    title: 'Recebe a estimativa',
    text: 'Calculamos o valor na hora, com base no mercado e no estado descrito.',
  },
  {
    title: 'Envia o equipamento',
    text: 'A nossa equipa faz a inspeção técnica e confirma o valor.',
  },
  {
    title: 'Recebe o pagamento',
    text: 'Valor confirmado, dinheiro na tua conta. Simples assim.',
  },
];

const valueFactors = [
  ['Modelo e capacidade', 'Modelos recentes e mais armazenamento valem mais.'],
  ['Saúde da bateria', 'Baterias acima de 85% aumentam a avaliação.'],
  ['Ecrã e traseira', 'Vidros sem riscos ou fissuras fazem toda a diferença.'],
  ['Caixa e acessórios', 'Embalagem original e acessórios sobem o valor.'],
] as const;

const venderFaqs = faqs.filter((f) =>
  ['Como vendo o meu iPhone sem comprar outro?', 'Como funciona o Trade-In?'].includes(f.q),
);

export default function VenderPage() {
  return (
    <main className="flex-1 bg-page pb-20">
      {/* Hero */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-indigo-950 sm:min-h-[340px]">
        <Image
          src={lifestyleImages.categories.standard}
          alt="Vender o meu iPhone"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 from-0% via-indigo-900/60 via-35% to-transparent to-60%" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-10">
          <div className="max-w-md">
            <h1 className="font-display text-3xl leading-[1.1] font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Vende o teu iPhone
              <br />
              sem <i className="font-light">complicações</i>.
            </h1>
            <p className="mt-3 text-sm text-white/80 sm:text-base">
              Sem negociar com estranhos. Avaliação justa e pagamento rápido.
            </p>
            <Link
              href="#avaliacao"
              className="mt-5 inline-flex h-10 items-center rounded-lg bg-white px-5 font-accent text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 sm:h-11 sm:text-[15px]"
            >
              Pedir avaliação
            </Link>
          </div>
        </div>
      </section>

      {/* Porquê vender aqui */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16">
        <h2 className="text-xl font-semibold">Porquê vender na iphonesAO</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-sm text-white"
              >
                ✓
              </span>
              <h3 className="mt-1 text-[15px] font-semibold">{benefit.title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section id="avaliacao" className="mx-auto w-full max-w-7xl scroll-mt-8 px-6 pt-16">
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

      {/* O que influencia o valor */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16">
        <div className="grid grid-cols-1 items-center gap-8 rounded-2xl bg-beige px-8 py-12 lg:grid-cols-2 lg:px-10">
          <div>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              O que faz o teu iPhone
              <br />
              <i className="underline decoration-accent decoration-8 underline-offset-4">
                valer mais?
              </i>
            </h2>
            <p className="mt-4 text-lg text-zinc-700">
              Antes de pedires a avaliação, vê os fatores que pesam no valor
              final.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {valueFactors.map(([title, text]) => (
              <li
                key={title}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <p className="text-[15px] font-semibold">{title}</p>
                <p className="mt-1 text-sm text-zinc-600">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA + FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 pt-16">
        <h2 className="text-2xl font-semibold">Perguntas frequentes.</h2>
        <FaqList faqs={venderFaqs} />
        <p className="mt-8 text-center text-[15px] text-zinc-700">
          Preferes trocar por um modelo mais recente?{' '}
          <Link
            href="/trade-in"
            className="font-semibold text-rose-600 underline underline-offset-2 hover:text-rose-700"
          >
            Conhece o Trade-In
          </Link>
        </p>
      </section>
    </main>
  );
}
