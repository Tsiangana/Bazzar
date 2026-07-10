import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Como Funciona',
  description:
    'Todo o processo passa pela empresa: qualidade, garantia, inspeção técnica e segurança.',
};

const lifecycle = [
  'Cliente possui um iPhone',
  'Quer trocar ou vender',
  'Solicita avaliação',
  'Empresa analisa e envia estimativa',
  'Cliente envia o equipamento',
  'Inspeção técnica',
  'Limpeza e reparação (se necessário)',
  'Classificação e fotografia',
  'Entrada em stock',
  'Venda direta ou leilão',
  'Novo proprietário',
];

const guarantees = [
  'Qualidade dos equipamentos',
  'Preços consistentes',
  'Garantia',
  'Inspeção técnica',
  'Transparência',
  'Segurança',
];

export default function ComoFuncionaPage() {
  return (
    <main className="flex-1 bg-page">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="font-display text-5xl font-medium tracking-tight text-zinc-950">
          Como funciona
        </h1>
        <p className="max-w-2xl text-zinc-700">
          Existem apenas dois intervenientes: a empresa e o cliente. Todo o
          processo passa pela empresa — o cliente nunca negocia diretamente com
          outro cliente. Isso garante:
        </p>
        <ul className="grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-3">
          {guarantees.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-4xl font-medium tracking-tight text-zinc-950">
          O ciclo de vida de um iPhone
        </h2>
        <p className="max-w-2xl text-zinc-700">
          O coração do projeto: acompanhamos todo o percurso do equipamento,
          desde o antigo proprietário até ao novo.
        </p>
        <ol className="flex max-w-2xl flex-col gap-2">
          {lifecycle.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-zinc-800">{step}</span>
            </li>
          ))}
        </ol>
      </section>
      </div>
    </main>
  );
}
