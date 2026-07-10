import type { Metadata } from 'next';
import Link from 'next/link';

import { ProductCard } from '@/components/features/products/ProductCard';
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

const filters = [
  'Preço',
  'Modelo',
  'Data de lançamento',
  'Dimensão do ecrã',
  'Capacidade de armazena...',
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

        {/* Barra de confiança */}
        <ul className="flex flex-col justify-between gap-3 rounded-xl bg-zinc-100 px-8 py-5 text-[15px] font-medium sm:flex-row">
          {trustStrip.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>

        {/* Título */}
        <h1 className="mt-10 font-display text-5xl font-medium tracking-tight sm:text-6xl">
          iPhones Remodelados
        </h1>
        <p className="mt-4 max-w-4xl text-[15px] text-zinc-800">
          A melhor opção para comprares o teu iPhone remodelado. Encontra todos
          os modelos disponíveis com o melhor preço e 100% de qualidade.
        </p>

        {/* Filtros */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-[15px] font-medium hover:border-zinc-500"
            >
              {filter}
              <span aria-hidden className="text-zinc-500">
                ⌄
              </span>
            </button>
          ))}
          <button className="flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-[15px] font-medium hover:border-zinc-500">
            Filtrar ⚌
          </button>
          <button className="ml-auto flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-2.5 text-[15px] font-medium hover:bg-zinc-200">
            Ordenar <strong>Bestsellers</strong>
            <span aria-hidden className="text-zinc-500">
              ⌄
            </span>
          </button>
        </div>

        <p className="mt-6 text-sm text-zinc-600">
          {catalogProducts.length} produtos
        </p>

        {/* Grelha de produtos */}
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {catalogProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Paginação */}
        <nav
          aria-label="Paginação"
          className="mt-12 flex items-center justify-center gap-2"
        >
          <button
            aria-label="Página anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400"
          >
            ‹
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              aria-current={page === 1 ? 'page' : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-medium ${
                page === 1 ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-200'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            aria-label="Página seguinte"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-200"
          >
            ›
          </button>
        </nav>

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
