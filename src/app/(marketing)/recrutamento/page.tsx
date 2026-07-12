import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Estamos a recrutar',
  description: 'Conhece a equipa iphonesAO e como te candidatares a futuras vagas.',
};

const values = [
  'Rigor técnico em cada inspeção',
  'Transparência com quem compra e vende',
  'Cuidado com o impacto ambiental',
  'Trabalho em equipa, sempre',
];

export default function RecrutamentoPage() {
  return (
    <main className="flex-1 bg-page">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-medium tracking-tight text-zinc-950 sm:text-5xl">
            Estamos a recrutar!
          </h1>
          <p className="text-lg text-zinc-700">
            Somos uma equipa pequena e apaixonada por dar uma segunda vida a
            cada iPhone. Se te revês nestes valores, adorávamos conhecer-te.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {values.map((value) => (
            <li
              key={value}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[15px] font-medium text-zinc-800"
            >
              {value}
            </li>
          ))}
        </ul>

        <div className="rounded-2xl bg-accent p-8">
          <h2 className="text-xl font-semibold text-zinc-950">
            Sem vagas abertas neste momento
          </h2>
          <p className="mt-2 text-[15px] leading-7 text-zinc-900">
            Mas gostamos sempre de conhecer talento novo. Envia-nos o teu CV e
            uma breve apresentação para{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-semibold underline decoration-2 underline-offset-4"
            >
              {siteConfig.contact.email}
            </a>{' '}
            e entramos em contacto assim que surgir uma oportunidade
            compatível.
          </p>
        </div>
      </div>
    </main>
  );
}
