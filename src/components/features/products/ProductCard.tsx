import Image from 'next/image';
import Link from 'next/link';

import { RatingStars } from '@/components/ui/RatingStars';
import { formatKz } from '@/lib/utils/format';
import type { CatalogProduct } from '@/lib/data/products';

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link
      href={`/comprar/${product.id}`}
      className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-lg"
    >
      <div className="relative mx-auto h-44 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, 260px"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {product.colors.map((hex) => (
          <span
            key={hex}
            className="h-3.5 w-3.5 rounded-full border border-zinc-300"
            style={{ backgroundColor: hex }}
            aria-hidden
          />
        ))}
        {product.extraColors ? (
          <span className="text-xs font-semibold">+{product.extraColors}</span>
        ) : null}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
      <RatingStars
        rating={product.rating}
        reviewsCount={product.reviewsCount}
        className="mt-1"
      />
      <p className="mt-2 text-sm text-zinc-700">A partir de</p>
      <p className="text-2xl font-bold tracking-tight">
        {formatKz(product.price)}
      </p>
      <p className="text-sm text-zinc-600">
        <s>{formatKz(product.newPrice)}</s> novo
      </p>
    </Link>
  );
}
