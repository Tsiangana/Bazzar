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
  /** When set, replaces the timer with a status pill */
  label?: 'Em Destaque' | 'Leilão Quente';
}

function TimerBadge({ minutesLeft, endsIn }: { minutesLeft: number; endsIn: string }) {
  if (minutesLeft < 180) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-sm bg-red-500 px-2.5 py-1.5 text-xs font-bold text-white">
        <svg className="h-3 w-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8" />
        </svg>
        {endsIn}
      </div>
    );
  }

  if (minutesLeft < 720) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-sm bg-amber-500 px-2.5 py-1.5 text-xs font-semibold text-white">
        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        {endsIn}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 rounded-sm bg-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-700">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      {endsIn}
    </div>
  );
}

export function AuctionCard({ auction, label }: AuctionCardProps) {
  const savings = auction.retailValue - auction.currentBid;
  const savingsPercent = Math.round((savings / auction.retailValue) * 100);

  return (
    <Link
      href={`/leiloes/${auction.product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-white transition-all"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <Image
          src={auction.product.image}
          alt={auction.product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge: label or timer */}
        <div className="absolute left-3 top-3">
          {label === 'Em Destaque' ? (
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-zinc-950 px-2.5 py-1.5 text-xs font-semibold text-white">
              Em Destaque
            </span>
          ) : label === 'Leilão Quente' ? (
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-amber-500 px-2.5 py-1.5 text-xs font-semibold text-white">
              Leilão Quente
            </span>
          ) : (
            <TimerBadge minutesLeft={auction.minutesLeft} endsIn={auction.endsIn} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-zinc-900 transition-colors group-hover:text-blue-600">
          {auction.product.name}
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          Remodelado · Certificado · Garantia 12 meses
        </p>

        {/* Stats */}
        <div className="mt-3 flex items-center gap-4 text-xs text-zinc-600">
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
        <div className="mt-4 flex items-end justify-between border-t border-zinc-100 pt-4">
          <div>
            <p className="text-xs font-medium text-zinc-500">Lance Atual</p>
            <p className="mt-0.5 font-accent text-xl font-bold text-zinc-900">{formatKz(auction.currentBid)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-400 line-through">{formatKz(auction.retailValue)}</p>
          </div>
        </div>

        {/* CTA */}
        <button className="mt-4 w-full rounded-lg bg-zinc-950 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-700 hover:shadow-md">
          Ver Leilão
        </button>
      </div>
    </Link>
  );
}
