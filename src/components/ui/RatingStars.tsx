interface RatingStarsProps {
  rating: number; // 0–5
  reviewsCount?: number;
  className?: string;
}

const STAR_PATH =
  'M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5z';

function StarShape({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path d={STAR_PATH} fill={color} />
    </svg>
  );
}

function Star({ fill }: { fill: number }) {
  // fill: 0 (vazia), 0.5 (meia), 1 (cheia)
  if (fill === 0.5) {
    return (
      <span className="relative inline-flex">
        <StarShape color="#d4d4d8" />
        <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
          <StarShape color="currentColor" />
        </span>
      </span>
    );
  }
  return <StarShape color={fill === 1 ? 'currentColor' : '#d4d4d8'} />;
}

export function RatingStars({ rating, reviewsCount, className }: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5].map((i) =>
    rating >= i - 0.25 ? 1 : rating >= i - 0.75 ? 0.5 : 0,
  );
  return (
    <span
      className={`flex items-center gap-1.5 text-zinc-950 ${className ?? ''}`}
    >
      <span className="flex" aria-hidden>
        {stars.map((fill, i) => (
          <Star key={i} fill={fill} />
        ))}
      </span>
      <span className="text-sm font-semibold">
        {rating.toFixed(1).replace('.', ',')}/5
      </span>
      {reviewsCount !== undefined && (
        <span className="text-sm text-zinc-600">
          ({reviewsCount.toLocaleString('pt-PT')})
        </span>
      )}
    </span>
  );
}
