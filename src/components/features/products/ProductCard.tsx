'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';

import { RatingStars } from '@/components/ui/RatingStars';
import { formatKz } from '@/lib/utils/format';
import { lifestyleImages, type CatalogProduct } from '@/lib/data/products';

const EXTRA_SHOTS = [lifestyleImages.pdp.screen, lifestyleImages.pdp.body];
const CYCLE_MS = 800;

export function ProductCard({ product }: { product: CatalogProduct }) {
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

  return (
    <Link
      href={`/comprar/${product.id}`}
      className="group flex flex-col rounded-xl border border-zinc-100 bg-white p-5"
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      <div className="relative mx-auto h-44 w-full overflow-hidden rounded-lg">
        <Image
          src={images[index]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, 260px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />
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
      <RatingStars
        rating={product.rating}
        reviewsCount={product.reviewsCount}
        className="mt-2"
      />
      <p className="mt-2 text-sm text-zinc-700">A partir de</p>
      <p className="font-accent text-2xl font-bold tracking-tight">
        {formatKz(product.price)}
      </p>
      <p className="text-sm text-red-600">
        <s>{formatKz(product.newPrice)}</s> novo
      </p>
    </Link>
  );
}
