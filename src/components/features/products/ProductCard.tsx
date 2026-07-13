'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';

import { RatingStars } from '@/components/ui/RatingStars';
import { formatKz } from '@/lib/utils/format';
import { lifestyleImages, type CatalogProduct } from '@/lib/data/products';

const EXTRA_SHOTS = [lifestyleImages.pdp.screen, lifestyleImages.pdp.body];
const CYCLE_MS = 800;

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

type ProductCardProps = {
  product: CatalogProduct;
  /** Quando definido, o card comporta-se como opção selecionável em vez de link. */
  onSelect?: () => void;
  selected?: boolean;
  /** Em fluxos onde o utilizador não compra (ex.: identificar o seu modelo), esconde preço e avaliação. */
  showPricing?: boolean;
};

export function ProductCard({
  product,
  onSelect,
  selected = false,
  showPricing = true,
}: ProductCardProps) {
  const images = [product.image, ...EXTRA_SHOTS];
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = useCallback(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, CYCLE_MS);
  }, [images.length]);

  const stopCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIndex(0);
  }, []);

  const content = (
    <>
      <div className="relative mx-auto h-44 w-full overflow-hidden rounded-lg">
        <Image
          src={images[index]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, 260px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />
        {onSelect && selected ? (
          <span className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 text-white">
            <CheckIcon />
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1" aria-hidden>
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? 'bg-zinc-950' : 'bg-zinc-300'
            }`}
          />
        ))}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <div className="mt-2 flex items-center justify-left gap-1.5">
        {product.colors.map((hex) => (
          <span
            key={hex}
            className="h-2 w-2 rounded-full border border-zinc-200"
            style={{ backgroundColor: hex }}
            aria-hidden
          />
        ))}
        {product.extraColors ? (
          <span className="text-xs font-semibold">+{product.extraColors}</span>
        ) : null}
      </div>
      {showPricing ? (
        <>
          <RatingStars
            rating={product.rating}
            reviewsCount={product.reviewsCount}
            className="mt-2"
          />
          <p className="mt-2 text-sm text-zinc-700">A partir de</p>
          <p className="font-accent text-2xl font-bold tracking-tight">
            {formatKz(product.price)}
          </p>
          {onSelect ? null : (
            <p className="text-sm text-red-600">
              <s>{formatKz(product.newPrice)}</s> novo
            </p>
          )}
        </>
      ) : null}
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`group flex h-full w-full cursor-pointer flex-col rounded-xl border bg-white p-5 text-left transition-colors ${
          selected
            ? 'border-zinc-200 bg-selected'
            : 'border-zinc-100 hover:border-zinc-200'
        }`}
        onMouseEnter={startCycle}
        onMouseLeave={stopCycle}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={`/comprar/${product.id}`}
      className="group flex flex-col rounded-xl border border-zinc-100 bg-white p-5"
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      {content}
    </Link>
  );
}
