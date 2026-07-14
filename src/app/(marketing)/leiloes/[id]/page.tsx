"use client";

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProduct } from '@/lib/data/products';
import { formatKz } from '@/lib/utils/format';

/* ─── Mock Data Generator ────────────────────────────────────────── */
function getAuctionData(price: number, index: number) {
  return {
    currentBid: Math.round(price * (0.68 + index * 0.02)),
    retailValue: price,
    bids: 127 - index * 15,
    watchers: 243 - index * 25,
    endsIn: ['1h 45m', '3h 22m', '6h 15m', '15h 30m'][Math.min(index, 3)],
    minutesLeft: [105, 202, 375, 930][Math.min(index, 3)],
    minBidIncrement: 5000,
    bidHistory: [
      { user: 'Miguel S.', avatar: 'MS', amount: Math.round(price * 0.71), time: 'há 3 min', isLeading: true },
      { user: 'Ana Paula', avatar: 'AP', amount: Math.round(price * 0.69), time: 'há 8 min', isLeading: false },
      { user: 'Carlos M.', avatar: 'CM', amount: Math.round(price * 0.67), time: 'há 15 min', isLeading: false },
      { user: 'Sara Lima', avatar: 'SL', amount: Math.round(price * 0.66), time: 'há 22 min', isLeading: false },
      { user: 'João F.', avatar: 'JF', amount: Math.round(price * 0.64), time: 'há 31 min', isLeading: false },
      { user: 'Rita Costa', avatar: 'RC', amount: Math.round(price * 0.62), time: 'há 45 min', isLeading: false },
      { user: 'Pedro A.', avatar: 'PA', amount: Math.round(price * 0.60), time: 'há 1h 2min', isLeading: false },
    ],
  };
}

/* ─── Components ────────────────────────────────────────────────── */
function CountdownTimer({ minutesLeft }: { minutesLeft: number }) {
  const hours = Math.floor(minutesLeft / 60);
  const minutes = minutesLeft % 60;

  const isUrgent = minutesLeft < 120;
  const isWarning = minutesLeft >= 120 && minutesLeft < 360;

  return (
    <div className="grid grid-cols-3 gap-2">
      {minutesLeft >= 1440 && (
        <div className={`rounded-xl ${isUrgent ? 'bg-red-100' : isWarning ? 'bg-amber-100' : 'bg-gray-100'} p-4 text-center`}>
          <div className={`text-3xl font-bold tabular-nums ${isUrgent ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-gray-900'}`}>
            {Math.floor(minutesLeft / 1440)}
          </div>
          <div className="mt-1 text-xs font-medium text-gray-600">Dias</div>
        </div>
      )}
      <div className={`rounded-xl ${isUrgent ? 'bg-red-100' : isWarning ? 'bg-amber-100' : 'bg-gray-100'} p-4 text-center`}>
        <div className={`text-3xl font-bold tabular-nums ${isUrgent ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-gray-900'}`}>
          {String(hours).padStart(2, '0')}
        </div>
        <div className="mt-1 text-xs font-medium text-gray-600">Horas</div>
      </div>
      <div className={`rounded-xl ${isUrgent ? 'bg-red-100' : isWarning ? 'bg-amber-100' : 'bg-gray-100'} p-4 text-center`}>
        <div className={`text-3xl font-bold tabular-nums ${isUrgent ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-gray-900'}`}>
          {String(minutes).padStart(2, '0')}
        </div>
        <div className="mt-1 text-xs font-medium text-gray-600">Min</div>
      </div>
      <div className={`rounded-xl ${isUrgent ? 'bg-red-100' : isWarning ? 'bg-amber-100' : 'bg-gray-100'} p-4 text-center`}>
        <div className={`text-3xl font-bold tabular-nums ${isUrgent ? 'text-red-600' : isWarning ? 'text-amber-600' : 'text-gray-900'}`}>
          00
        </div>
        <div className="mt-1 text-xs font-medium text-gray-600">Seg</div>
      </div>
    </div>
  );
}

function BidHistoryItem({ entry }: { entry: typeof auction.bidHistory[0] }) {
  const avatarColors = [
    'bg-blue-500',
    'bg-violet-500',
    'bg-rose-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-cyan-500',
    'bg-pink-500',
  ];
  const colorIndex = entry.user.charCodeAt(0) % avatarColors.length;

  return (
    <div className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${entry.isLeading ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${avatarColors[colorIndex]} text-sm font-bold text-white`}>
          {entry.avatar}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{entry.user}</p>
          <p className="text-xs text-gray-500">{entry.time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-lg font-bold ${entry.isLeading ? 'text-blue-600' : 'text-gray-900'}`}>
          {formatKz(entry.amount)}
        </p>
        {entry.isLeading && (
          <p className="text-xs font-semibold text-blue-600">★ LÍDER</p>
        )}
      </div>
    </div>
  );
}

/* ─── Page Component ────────────────────────────────────────────── */
const auction = { bidHistory: [{}] } as ReturnType<typeof getAuctionData>;

export default function LeilaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProduct(id);
  if (!product) notFound();

  const index = ['iphone-16', 'iphone-16-plus', 'iphone-15-plus', 'iphone-16-pro-max'].indexOf(id);
  const auctionData = getAuctionData(product.price, Math.max(0, index));

  const savings = auctionData.retailValue - auctionData.currentBid;
  const savingsPercent = Math.round((savings / auctionData.retailValue) * 100);
  const nextMinBid = auctionData.currentBid + auctionData.minBidIncrement;

  const isUrgent = auctionData.minutesLeft < 120;

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-sm text-gray-600">
          <Link href="/" className="transition-colors hover:text-gray-900">Início</Link>
          <span>›</span>
          <Link href="/leiloes" className="transition-colors hover:text-gray-900">Leilões</Link>
          <span>›</span>
          <span className="font-medium text-gray-900">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Urgency Badge */}
              {isUrgent && (
                <div className="absolute left-6 top-6">
                  <span className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    <svg className="h-4 w-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" />
                    </svg>
                    A TERMINAR EM BREVE!
                  </span>
                </div>
              )}

              {/* Watch Button */}
              <button className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-gray-600 backdrop-blur-sm transition-colors hover:text-red-500">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Product Details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700">
                  <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Certificado iPhonesAO
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700">
                  <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  12 meses garantia
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700">
                  <svg className="h-4 w-4 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Envio incluído
                </span>
              </div>

              <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900">Sobre este produto</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  Este {product.name} foi inspeccionado pelos nossos técnicos especializados,
                  recondicionado segundo os mais elevados padrões de qualidade e certificado pela
                  iPhonesAO. Inclui garantia completa de 12 meses e envio gratuito rastreado para
                  todo o território nacional. Estado: Excelente - sem riscos visíveis, bateria com
                  capacidade superior a 85%, todos os componentes funcionais testados.
                </p>
              </div>

              {/* Specs */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 pt-6 sm:grid-cols-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">Condição</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">Excelente</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Bateria</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">&gt; 85%</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Garantia</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">12 meses</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Envio</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">Grátis</p>
                </div>
              </div>
            </div>

            {/* Bid History */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Histórico de Lances</h3>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                  {auctionData.bids} lances
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {auctionData.bidHistory.map((entry, i) => (
                  <BidHistoryItem key={i} entry={entry} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Bidding Panel (Sticky) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4">
              {/* Main Bid Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                {/* Timer */}
                <div className="mb-6">
                  <p className="mb-3 text-sm font-semibold text-gray-600">Tempo Restante</p>
                  <CountdownTimer minutesLeft={auctionData.minutesLeft} />
                  {isUrgent && (
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-red-600">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      A terminar em breve!
                    </div>
                  )}
                </div>

                {/* Current Bid */}
                <div className="mb-6 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 p-6">
                  <p className="text-sm font-semibold text-gray-600">Lance Atual</p>
                  <p className="mt-2 text-4xl font-bold text-gray-900">{formatKz(auctionData.currentBid)}</p>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Valor de mercado:</span>
                    <div className="text-right">
                      <span className="text-gray-400 line-through">{formatKz(auctionData.retailValue)}</span>
                      <span className="ml-2 font-bold text-green-600">-{savingsPercent}%</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                      {auctionData.bids} lances
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {auctionData.watchers} a observar
                    </span>
                  </div>
                </div>

                {/* Bid Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      O Teu Lance (mín. {formatKz(nextMinBid)})
                    </label>
                    <div className="mt-2 flex overflow-hidden rounded-xl border-2 border-gray-300 bg-white transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                      <span className="flex items-center pl-4 text-sm font-semibold text-gray-600">Kz</span>
                      <input
                        type="number"
                        min={nextMinBid}
                        step={auctionData.minBidIncrement}
                        defaultValue={nextMinBid}
                        className="w-full bg-transparent px-3 py-3 text-lg font-bold text-gray-900 outline-none"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Incrementos de {formatKz(auctionData.minBidIncrement)}
                    </p>
                  </div>

                  <button className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 font-bold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-violet-500/30">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    DAR LANCE AGORA
                  </button>

                  {/* Auto Bid Option */}
                  <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-300 font-semibold text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Lance Automático
                  </button>

                  {/* Security Notice */}
                  <div className="rounded-xl bg-gray-50 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pagamento Seguro</p>
                        <p className="mt-1 text-xs leading-relaxed text-gray-600">
                          Só pagas se ganhares o leilão. Aceita Multicaixa, transferência e dinheiro na entrega.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '✓', label: 'Certificado', color: 'text-green-600' },
                  { icon: '⚡', label: 'Envio 24h', color: 'text-blue-600' },
                  { icon: '↩', label: '30 dias devolução', color: 'text-violet-600' },
                  { icon: '🛡', label: '12 meses garantia', color: 'text-amber-600' },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
                    <span className={`text-lg ${badge.color}`}>{badge.icon}</span>
                    <span className="text-xs font-semibold text-gray-700">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Back Link */}
              <Link
                href="/leiloes"
                className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Ver todos os leilões
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
