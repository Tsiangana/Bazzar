import type { Metadata } from 'next';
import Image from 'next/image';

import { catalogProducts } from '@/lib/data/products';
import { formatKz } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Leilões',
  description:
    'Leilões de iPhones exclusivos da empresa — acompanha o preço, o tempo restante e dá o teu lance.',
};

const auctions = catalogProducts.slice(0, 6).map((product, i) => ({
  product,
  currentBid: Math.round(product.price * 0.72),
  bids: 14 + i * 7,
  participants: 6 + i * 3,
  endsIn: ['2h 14m', '5h 40m', '1d 3h', '1d 9h', '2d 1h', '3d 6h'][i],
}));

export default function LeiloesPage() {
  return (
    <main className="flex-1 bg-page pb-20">
      {/* Hero */}
      <section className="bg-accent">
        <div className="mx-auto w-full max-w-7xl px-6 py-14">
          <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl">
            Leilões <i className="font-light">exclusivos</i>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-900">
            Equipamentos especiais e modelos raros, todos propriedade da
            empresa. O maior lance vence — nenhum utilizador cria leilões.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        <h2 className="text-xl font-semibold">A decorrer agora</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {auctions.map(({ product, currentBid, bids, participants, endsIn }) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative h-56">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 400px"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">
                  Termina em {endsIn}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-zinc-700">Lance atual</p>
                <p className="text-2xl font-bold tracking-tight">
                  {formatKz(currentBid)}
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  {bids} lances · {participants} participantes
                </p>
                <button className="mt-4 h-12 w-full rounded-lg bg-zinc-950 font-semibold text-white transition-colors hover:bg-zinc-700">
                  Dar lance
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
