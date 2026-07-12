import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProduct } from '@/lib/data/products';
import { formatKz } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Leilão',
};

export default async function LeilaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const currentBid = Math.round(product.price * 0.72);

  return (
    <main className="flex-1 bg-page pb-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <nav className="flex items-center gap-3 py-5 text-[15px] font-medium">
          <Link href="/" className="hover:underline">
            Início
          </Link>
          <span aria-hidden className="text-zinc-400">
            ›
          </span>
          <Link href="/leiloes" className="hover:underline">
            Leilões
          </Link>
          <span aria-hidden className="text-zinc-400">
            ›
          </span>
          <span>{product.name}</span>
        </nav>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-display text-4xl font-medium tracking-tight">
              {product.name}
            </h1>
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-7">
              <p className="text-sm text-zinc-700">Lance atual</p>
              <p className="text-4xl font-bold tracking-tight">
                {formatKz(currentBid)}
              </p>
              <p className="mt-2 text-[15px] text-zinc-600">
                21 lances · 9 participantes · termina em 2h 14m
              </p>
              <button className="mt-6 h-13 w-full rounded-lg bg-zinc-950 font-accent text-[17px] font-semibold text-white transition-colors hover:bg-zinc-700">
                Dar lance
              </button>
            </div>
            {/* TODO: histórico de lances em tempo real */}
          </div>
        </section>
      </div>
    </main>
  );
}
