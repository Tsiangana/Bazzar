import type { Metadata } from 'next';

import { catalogProducts } from '@/lib/data/products';
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
const featured = auctions.filter(a => a.trending);
const hot = auctions.filter(a => a.status === 'hot' && !a.trending);
const active = auctions.filter(a => a.status === 'active');

/* ─── Page ───────────────────────────────────────────────────────── */
export default function LeiloesPage() {
  return (
    <main className="flex-1 bg-gray-50 pb-24">

      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
              <svg className="h-4 w-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" />
              </svg>
              {auctions.length} leilões ativos
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Leilões de iPhones
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Produtos certificados pela iPhonesAO com garantia de 12 meses.
              Dá o teu lance e poupa até 40% do valor de mercado.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-3 gap-6 md:gap-12">
              <div>
                <p className="text-3xl font-bold text-gray-900">{auctions.reduce((acc, a) => acc + a.bids, 0)}+</p>
                <p className="mt-1 text-sm text-gray-600">Lances Ativos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="mt-1 text-sm text-gray-600">Satisfação</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">24h</p>
                <p className="mt-1 text-sm text-gray-600">Envio Rápido</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🔥 Em Destaque</h2>
              <p className="mt-1 text-sm text-gray-600">Os leilões mais disputados agora</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((auction) => (
              <AuctionCard key={auction.product.id} auction={auction} featured />
            ))}
          </div>
        </section>
      )}

      {/* Hot Auctions */}
      {hot.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">⚡ Leilões Quentes</h2>
            <p className="mt-1 text-sm text-gray-600">A terminar nas próximas horas</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hot.map((auction) => (
              <AuctionCard key={auction.product.id} auction={auction} />
            ))}
          </div>
        </section>
      )}

      {/* Active Auctions */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Todos os Leilões</h2>
            <p className="mt-1 text-sm text-gray-600">Ordenados por atividade</p>
          </div>

          {/* Filters */}
          <div className="hidden items-center gap-3 md:flex">
            <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Todos</option>
              <option>A terminar</option>
              <option>Mais lances</option>
              <option>Menor preço</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {active.map((auction) => (
            <AuctionCard key={auction.product.id} auction={auction} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Como Funcionam os Leilões</h2>
            <p className="mt-2 text-gray-600">Simples, transparente e seguro</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Produtos Certificados',
                description: 'Todos os equipamentos são inspecionados e certificados pela iPhonesAO com garantia de 12 meses.',
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Dá o Teu Lance',
                description: 'Acompanha o valor atual e licita o quanto estiveres disposto a pagar até ao fim do tempo.',
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: 'O Maior Lance Vence',
                description: 'Quando o tempo termina, o equipamento é enviado ao vencedor com envio rastreado incluído.',
              },
            ].map((step) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  {step.icon}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
