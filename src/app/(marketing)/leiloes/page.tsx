import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FaqList } from '@/components/features/FaqList';
import { faqs } from '@/lib/data/faqs';
import { catalogProducts, lifestyleImages } from '@/lib/data/products';
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
  hot: i < 2,
}));

const rules = [
  {
    title: 'Só a empresa leiloa',
    text: 'Todos os equipamentos são propriedade da iphonesAO, inspecionados e com garantia. Nenhum utilizador cria leilões.',
  },
  {
    title: 'Dás o teu lance',
    text: 'Acompanha o valor atual e licita quanto estiveres disposto a pagar, até ao fim do tempo.',
  },
  {
    title: 'O maior lance vence',
    text: 'Quando o tempo termina, o equipamento é enviado ao vencedor com envio rastreado.',
  },
];

const leilaoFaqs = faqs.filter((f) =>
  ['Como funcionam os leilões?', 'Como sei que o dispositivo vai funcionar bem?'].includes(f.q),
);

export default function LeiloesPage() {
  return (
    <main className="flex-1 bg-page pb-20">
      {/* Hero */}
      <section className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-violet-950 sm:min-h-[340px]">
        <Image
          src={lifestyleImages.categories.auctions}
          alt="Leilões de iPhones"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950 from-0% via-violet-900/60 via-35% to-transparent to-60%" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-10">
          <div className="max-w-md">
            <h1 className="font-display text-3xl leading-[1.1] font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Leilões <i className="font-light">exclusivos</i>.
            </h1>
            <p className="mt-3 text-sm text-white/80 sm:text-base">
              Equipamentos especiais e modelos raros, todos propriedade da
              empresa. O maior lance vence.
            </p>
            <Link
              href="#a-decorrer"
              className="mt-5 inline-flex h-10 items-center rounded-lg bg-white px-5 font-accent text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 sm:h-11 sm:text-[15px]"
            >
              Ver leilões a decorrer
            </Link>
          </div>
        </div>
      </section>

      {/* A decorrer */}
      <section id="a-decorrer" className="mx-auto w-full max-w-7xl scroll-mt-8 px-6 pt-12">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">A decorrer agora</h2>
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
            <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
            {auctions.length} leilões ativos
          </span>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {auctions.map(({ product, currentBid, bids, participants, endsIn, hot }) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg"
            >
              <Link href={`/leiloes/${product.id}`} className="block">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 90vw, 400px"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                  <span
                    className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                      hot ? 'bg-rose-600' : 'bg-zinc-950'
                    }`}
                  >
                    {hot ? '🔥 ' : ''}Termina em {endsIn}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-zinc-700">Lance atual</p>
                      <p className="font-accent text-2xl font-bold tracking-tight">
                        {formatKz(currentBid)}
                      </p>
                    </div>
                    <p className="pb-1 text-right text-sm text-zinc-600">
                      {bids} lances
                      <br />
                      {participants} participantes
                    </p>
                  </div>
                  <span className="mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-zinc-950 font-accent font-semibold text-white transition-colors group-hover:bg-zinc-700">
                    Dar lance
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Regras */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-16">
        <h2 className="text-xl font-semibold">Como funcionam</h2>
        <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rules.map((rule, i) => (
            <li
              key={rule.title}
              className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="text-[15px] font-semibold">{rule.title}</h3>
              <p className="text-sm leading-6 text-zinc-600">{rule.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 pt-16">
        <h2 className="text-2xl font-semibold">Perguntas frequentes.</h2>
        <FaqList faqs={leilaoFaqs} />
      </section>
    </main>
  );
}
