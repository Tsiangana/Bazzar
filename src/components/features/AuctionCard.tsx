"use client";

import Image from 'next/image';
import Link from 'next/link';
import { formatKz } from '@/lib/utils/format';

interface AuctionCardProps {
  auction: {
    product: {
      id: string;
      name: string;
      image: string;
    };
    currentBid: number;
    retailValue: number;
    bids: number;
    watchers: number;
    endsIn: string;
    minutesLeft: number;
  };
  featured?: boolean;
}

function TimerBadge({ minutesLeft, endsIn }: { minutesLeft: number; endsIn: string }) {
  if (minutesLeft < 180) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-2.5 py-1.5 text-xs font-bold text-white">
        <svg className="h-3 w-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" />
        </svg>
        {endsIn}
      </div>
    );
  }

  if (minutesLeft < 720) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-2.5 py-1.5 text-xs font-semibold text-white">
        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        {endsIn}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      {endsIn}
    </div>
  );
}

export function AuctionCard({ auction, featured = false }: AuctionCardProps) {
  const savings = auction.retailValue - auction.currentBid;
  const savingsPercent = Math.round((savings / auction.retailValue) * 100);

  if (featured) {
    return (
      <Link
        href={`/leiloes/${auction.product.id}`}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 p-[1px] transition-all hover:shadow-2xl hover:shadow-violet-500/20"
      >
        <div className="relative h-full overflow-hidden rounded-2xl bg-white">
          {/* Badge Trending */}
          <div className="absolute left-4 top-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
              EM DESTAQUE
            </span>
          </div>

          <div className="grid gap-0 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square bg-gray-50 md:aspect-auto">
              <Image
                src={auction.product.image}
                alt={auction.product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-6 md:p-8">
              <div>
                <TimerBadge minutesLeft={auction.minutesLeft} endsIn={auction.endsIn} />

                <h3 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
                  {auction.product.name}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Certificado · 12 meses de garantia · Envio incluído
                </p>

                {/* Stats */}
                <div className="mt-6 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    <span className="font-semibold">{auction.bids}</span> lances
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="font-semibold">{auction.watchers}</span> a observar
                  </div>
                </div>
              </div>

              {/* Bid Section */}
              <div className="mt-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Lance Atual</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{formatKz(auction.currentBid)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 line-through">{formatKz(auction.retailValue)}</p>
                    <p className="text-sm font-bold text-green-600">-{savingsPercent}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-center font-bold text-white transition-all hover:shadow-lg hover:shadow-violet-500/30">
                    Dar Lance →
                  </div>
                  <button
                    onClick={(e) => { e.preventDefault(); }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-200 text-gray-400 transition-colors hover:border-red-500 hover:text-red-500"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/leiloes/${auction.product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={auction.product.image}
          alt={auction.product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Timer Badge */}
        <div className="absolute left-3 top-3">
          <TimerBadge minutesLeft={auction.minutesLeft} endsIn={auction.endsIn} />
        </div>

        {/* Watch Button */}
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-gray-400 opacity-0 backdrop-blur-sm transition-all hover:text-red-500 group-hover:opacity-100"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Savings Badge */}
        {savingsPercent > 20 && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex rounded-lg bg-green-500 px-2.5 py-1 text-xs font-bold text-white">
              -{savingsPercent}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {auction.product.name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Remodelado · Certificado · Garantia 12 meses
        </p>

        {/* Stats */}
        <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            {auction.bids} lances
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {auction.watchers}
          </span>
        </div>

        {/* Bid Info */}
        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs font-medium text-gray-500">Lance Atual</p>
            <p className="mt-0.5 text-xl font-bold text-gray-900">{formatKz(auction.currentBid)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 line-through">{formatKz(auction.retailValue)}</p>
          </div>
        </div>

        {/* CTA */}
        <button className="mt-4 w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700">
          Ver Leilão
        </button>
      </div>
    </Link>
  );
}
