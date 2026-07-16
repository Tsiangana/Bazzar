import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { catalogProducts, lifestyleImages } from '@/lib/data/products';
import { AuctionCard } from '@/components/features/AuctionCard';

export const metadata: Metadata = {
  title: 'Leilões — iPhonesAO',
  description: 'Leilões de iPhones exclusivos — acompanha o preço, o tempo restante e dá o teu lance.',
};

/* ─── Mock Data ────────────────────────────────────────────────── */
const rawAuctions = catalogProducts.slice(0, 9).map((product, i) => ({
  product,
  currentBid: Math.round(product.price * (0.68 + i * 0.02)),
  retailValue: product.price,
  bids: 42 - i * 4,
  watchers: 85 - i * 8,
  endsIn: ['2h 15m', '4h 30m', '8h 45m', '12h 20m', '1d 2h', '1d 18h', '2d 5h', '3d 12h', '4d 8h'][i],
  minutesLeft: [135, 270, 525, 740, 1560, 2520, 3060, 5040, 6240][i],
  status: i < 3 ? 'hot' : i < 6 ? 'active' : 'ending-soon',
  trending: i < 2,
}));

const auctions = rawAuctions;

/* ─── Page ───────────────────────────────────────────────────────── */
export default function LeiloesPage() {
  return (
    <main className="flex-1 bg-page pb-20">

      {/* Hero */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-zinc-950 sm:min-h-[360px]">
        <Image
          src={lifestyleImages.categories.auctions}
          alt="Leilões de iPhones iPhonesAO"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 from-0% via-zinc-900/60 via-35% to-transparent to-60%" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-10">
          <div className="max-w-md">
            <h1 className="mt-4 font-display text-3xl leading-[1.1] font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Leilões de iPhones
              <br />
              <i className="font-light">certificados</i>.
            </h1>
            <p className="mt-3 text-sm text-white/80 sm:text-base">
              Dá o teu lance e poupa até 40% do valor de mercado.
              Garantia de 12 meses incluída.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="#leiloes"
                className="inline-flex h-10 items-center rounded-lg bg-white px-5 font-accent text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 sm:h-11 sm:text-[15px]"
              >
                Ver leilões
              </Link>
              <Link
                href="/como-funciona"
                className="inline-flex h-10 items-center rounded-lg border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:h-11 sm:text-[15px]"
              >
                Como funciona
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Auctions — unified grid */}
      <section id="leiloes" className="mx-auto max-w-7xl px-6 pt-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Todos os Leilões</h2>
            <p className="mt-1 text-sm text-zinc-600">Ordenados por atividade</p>
          </div>

          {/* Filters */}
          <div className="hidden items-center gap-2 md:flex">
            {(['Todos', 'A terminar', 'Mais lances', 'Menor preço'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-[12px] font-medium text-zinc-900 transition-colors hover:border-zinc-500"
              >
                {opt}
                {opt === 'Todos' && (
                  <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </button>
            ))}
          </div>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {auctions.map((auction) => (
            <AuctionCard
              key={auction.product.id}
              auction={auction}
              label={
                auction.trending
                  ? 'Em Destaque'
                  : auction.status === 'hot'
                  ? 'Leilão Quente'
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16">
        <div className="rounded-2xl bg-beige px-8 py-12 lg:px-10">
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Como funcionam{' '}
            <i className="underline decoration-accent decoration-8 underline-offset-4">
              os leilões
            </i>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-700">
            Simples, transparente e seguro. O maior lance no fim do tempo vence.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Produtos Certificados',
                description: 'Todos os equipamentos são inspecionados e certificados pela iPhonesAO com garantia de 12 meses.',
              },
              {
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Dá o Teu Lance',
                description: 'Acompanha o valor atual e licita o quanto estiveres disposto a pagar até ao fim do tempo.',
              },
              {
                icon: (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: 'O Maior Lance Vence',
                description: 'Quando o tempo termina, o equipamento é enviado ao vencedor com envio rastreado incluído.',
              },
            ].map((step) => (
              <div key={step.title} className="flex flex-col gap-3 rounded-xl bg-white p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-white">
                  {step.icon}
                </span>
                <h3 className="text-[15px] font-semibold text-zinc-900">{step.title}</h3>
                <p className="text-sm leading-6 text-zinc-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
