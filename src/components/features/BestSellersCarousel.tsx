'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { formatKz } from '@/lib/utils/format';
import type { CatalogProduct } from '@/lib/data/products';

export function BestSellersCarousel({
  products,
}: {
  products: CatalogProduct[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function updateScrollState() {
      if (!el) return;
      setCanScrollPrev(el.scrollLeft > 4);
      setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    }

    updateScrollState();
    el.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  function scroll(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' });
  }

  const arrowClass = (enabled: boolean) =>
    `flex h-11 w-11 items-center justify-center rounded-full transition-colors ${enabled
      ? 'bg-zinc-950 text-white hover:bg-zinc-700 cursor-pointer'
      : 'bg-zinc-200 text-zinc-400'
    }`;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Modelos mais vendidos</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => scroll(-1)}
            disabled={!canScrollPrev}
            className={arrowClass(canScrollPrev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Seguinte"
            onClick={() => scroll(1)}
            disabled={!canScrollNext}
            className={arrowClass(canScrollNext)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, i) => (
          <figure
            key={product.id}
            className="w-full shrink-0 snap-start overflow-hidden rounded-2xl border border-zinc-200 bg-white sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)]"
          >
            <Link href={`/comprar/${product.id}`} className="group block">
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 300px"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
                <figcaption className="absolute top-3 left-3 rounded bg-white px-2 py-0.5 text-sm font-semibold">
                  Nº{i + 1} mais vendido
                </figcaption>
                <div className="absolute inset-x-0 bottom-0 bg-zinc-950/80 p-4 text-white">
                  <p className="text-sm leading-5 font-semibold">
                    {product.name}
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {'★'.repeat(Math.round(product.rating))}
                    {'☆'.repeat(5 - Math.round(product.rating))}{' '}
                    {product.rating.toFixed(1).replace('.', ',')}/5
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <span className="text-sm text-zinc-700">A partir de</span>
                <span className="font-accent text-lg font-bold tracking-tight">
                  {formatKz(product.price)}
                </span>
              </div>
            </Link>
          </figure>
        ))}
      </div>
    </section>
  );
}
