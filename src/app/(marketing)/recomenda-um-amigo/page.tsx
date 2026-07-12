import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Recomenda um amigo',
  description: 'Convida um amigo para a iphonesAO e ganham os dois.',
};

const steps = [
  'Convida um amigo para conhecer a iphonesAO',
  'O teu amigo compra, vende ou faz trade-in de um iPhone',
  'Vocês os dois recebem um crédito para usar na próxima compra',
];

const mailtoHref = `mailto:?subject=${encodeURIComponent(
  'Vem conhecer a iphonesAO',
)}&body=${encodeURIComponent(
  'Olá! Tenho usado a iphonesAO para comprar e vender iPhones remodelados e acho que também vais gostar. Dá uma vista de olhos: ' +
    siteConfig.url,
)}`;

export default function RecomendaUmAmigoPage() {
  return (
    <main className="flex-1 bg-page">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-medium tracking-tight text-zinc-950 sm:text-5xl">
            Recomenda um amigo
          </h1>
          <p className="text-lg text-zinc-700">
            Partilha a iphonesAO com quem quiseres e ganham os dois um
            desconto na próxima compra.
          </p>
        </div>

        <ol className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-[15px] font-medium text-zinc-800">
                {step}
              </span>
            </li>
          ))}
        </ol>

        <a
          href={mailtoHref}
          className="inline-flex h-13 w-fit items-center rounded-lg bg-zinc-950 px-7 font-accent text-[17px] font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          Convidar um amigo
        </a>
      </div>
    </main>
  );
}
