import type { Metadata } from 'next';
import Link from 'next/link';

import { ProductFilters } from '@/components/features/products/ProductFilters';
import { catalogProducts } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'iPhones Remodelados',
  description:
    'Encontra todos os modelos de iPhone disponíveis com o melhor preço e 100% de qualidade.',
};

const trustStrip = [
  { icon: '🛡', label: '12 meses de garantia comercial' },
  { icon: '🚚', label: 'Entrega gratuita em Luanda' },
  { icon: '↩', label: '30 dias para devolução gratuita' },
  { icon: '🎧', label: 'Apoio ao Cliente amigável' },
];

export default function ComprarPage() {
  return (
    <main className="flex-1 bg-page pb-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 py-5 text-[15px] font-medium">
          <Link href="/" className="hover:underline">
            Início
          </Link>
          <span aria-hidden className="text-zinc-400">
            ›
          </span>
          <Link href="/comprar" className="hover:underline">
            Comprar
          </Link>
          <span aria-hidden className="text-zinc-400">
            ›
          </span>
          <span>iPhone</span>
        </nav>

        {/* Título */}
        <h1 className="mt-10 text-5xl font-medium tracking-tight sm:text-6xl">
          iPhones
        </h1>
        <p className="mt-4 max-w-4xl text-[15px] text-zinc-800">
          Encontra todos os modelos disponíveis com o melhor preço e 100% de qualidade.
        </p>

        {/* Filtros + grelha de produtos */}
        <ProductFilters products={catalogProducts} />

        {/* Texto informativo */}
        <section className="mt-16 max-w-4xl">
          <h2 className="text-lg font-semibold">
            Ao vivo e a cores: falo do iPhone remodelado
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-zinc-700">
            Comprar um iPhone remodelado na iphonesAO é a forma mais
            inteligente de teres o modelo que queres por uma fração do preço.
            Cada equipamento passa por uma inspeção técnica de 25 pontos, é
            limpo, reparado quando necessário e classificado pelo estado
            estético. Recebes sempre fotografias reais, o relatório técnico, a
            saúde da bateria e 12 meses de garantia.
          </p>
        </section>
      </div>
    </main>
  );
}
