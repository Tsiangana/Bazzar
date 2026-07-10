import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProductCard } from '@/components/features/products/ProductCard';
import { RatingStars } from '@/components/ui/RatingStars';
import { catalogProducts, getProduct } from '@/lib/data/products';
import { formatKz } from '@/lib/utils/format';
import { Configurator } from './Configurator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return { title: product ? `${product.name} Remodelado` : 'Equipamento' };
}

const inspectionCards = [
  { icon: '🔋', label: 'Estado da bateria' },
  { icon: '📱', label: 'Ecrã' },
  { icon: '📷', label: 'Câmaras' },
  { icon: '🔊', label: 'Áudio' },
];

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const savings = product.newPrice - product.price;
  const related = catalogProducts.filter((p) => p.id !== id).slice(0, 4);

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
            iPhone
          </Link>
          <span aria-hidden className="text-zinc-400">
            ›
          </span>
          <span>{product.name}</span>
        </nav>

        {/* Topo do produto */}
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`relative h-20 w-16 overflow-hidden rounded-lg border ${
                    i === 0 ? 'border-zinc-950' : 'border-zinc-200'
                  }`}
                >
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
              ))}
            </div>
            <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-2xl bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover"
              />
              <span className="absolute top-4 right-4 flex h-24 w-24 rotate-12 items-center justify-center rounded-full bg-accent p-3 text-center text-xs font-semibold">
                Remodelação profissional ✓
              </span>
            </div>
          </div>

          <div>
            <h1 className="font-display text-4xl font-medium tracking-tight">
              {product.name}
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <RatingStars
                rating={product.rating}
                reviewsCount={product.reviewsCount}
              />
              <Link href="#avaliacoes" className="text-sm underline">
                avaliações
              </Link>
            </div>

            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <p className="text-3xl font-bold tracking-tight">
                  {formatKz(product.price)}
                </p>
                <p className="mt-1 text-[15px] text-zinc-600">
                  <s>{formatKz(product.newPrice)}</s> novo{' '}
                  <span className="ml-2 rounded bg-green-100 px-2 py-0.5 font-semibold text-green-900">
                    Poupa {formatKz(savings)}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-13 rounded-lg bg-zinc-950 px-10 text-[17px] font-semibold text-white transition-colors hover:bg-zinc-700">
                  Comprar
                </button>
                <button
                  aria-label="Adicionar aos favoritos"
                  className="flex h-13 w-13 items-center justify-center rounded-lg border border-zinc-300 text-xl hover:border-zinc-500"
                >
                  ♡
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {[
                'Envio gratuito em 16 – 17/07',
                '30 dias para devolução gratuita · 12 meses de garantia',
                'Remodelado verificado',
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center justify-between rounded-xl bg-trust px-5 py-4 text-[15px] font-medium"
                >
                  {text}
                  <span aria-hidden className="text-zinc-500">
                    ›
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Remodelados por profissionais
                  </h2>
                  <p className="mt-1 text-zinc-700">Inspeção em 25 pontos</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {inspectionCards.map((card) => (
                  <div
                    key={card.label}
                    className="flex flex-col gap-6 rounded-xl bg-gradient-to-br from-rose-100 via-sky-100 to-lime-100 p-4"
                  >
                    <span aria-hidden className="text-xl">
                      {card.icon}
                    </span>
                    <span className="text-sm font-semibold">{card.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Configurador */}
        <div className="mt-20">
          <Configurator product={product} />
        </div>

        {/* Relacionados */}
        <section className="mt-20">
          <h2 className="text-xl font-semibold">Pode também gostar de</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
