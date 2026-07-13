import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FaqList } from '@/components/features/FaqList';
import { faqs } from '@/lib/data/faqs';
import { catalogProducts, lifestyleImages } from '@/lib/data/products';
import { formatKz } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Leilões — iPhonesAO',
  description:
    'Leilões de iPhones exclusivos da empresa — acompanha o preço, o tempo restante e dá o teu lance.',
};

/* ─── Dados mock ────────────────────────────────────────────────── */
const rawAuctions = catalogProducts.slice(0, 6).map((product, i) => ({
  product,
  currentBid: Math.round(product.price * (0.68 + i * 0.02)),
  bids: 42 - i * 5,          // descendente → mais lances primeiro
  participants: 18 - i * 2,
  endsIn: ['1h 22m', '2h 50m', '5h 10m', '1d 4h', '2d 1h', '3d 6h'][i],
  /** minutos restantes — para lógica de urgência */
  minutesLeft: [82, 170, 310, 1680, 2940, 4680][i],
}));

/** Ordena por nº de lances (mais quente primeiro) */
const auctions = [...rawAuctions].sort((a, b) => b.bids - a.bids);
const featured = auctions[0];
const rest = auctions.slice(1);

/* ─── Helpers ────────────────────────────────────────────────────── */
function urgencyBadge(minutesLeft: number, endsIn: string) {
  if (minutesLeft < 180) {
    // < 3 h — vermelho pulsante
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white">
        <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        {endsIn}
      </span>
    );
  }
  if (minutesLeft < 1440) {
    // < 24 h — âmbar
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/80" />
        {endsIn}
      </span>
    );
  }
  // restante — cinza neutro
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-zinc-800/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16" aria-hidden>
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
      </svg>
      {endsIn}
    </span>
  );
}

/** Barra de actividade visual (proxy: mais lances = barra mais cheia) */
function ActivityBar({ bids, max }: { bids: number; max: number }) {
  const pct = Math.round((bids / max) * 100);
  return (
    <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-zinc-100">
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-400 to-violet-600 transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

const maxBids = Math.max(...auctions.map((a) => a.bids));

const rules = [
  {
    title: 'Só a empresa leiloa',
    text: 'Todos os equipamentos são propriedade da iPhonesAO, inspecionados e com garantia. Nenhum utilizador cria leilões.',
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

/* ─── Page ───────────────────────────────────────────────────────── */
export default function LeiloesPage() {
  return (
    <main className="flex-1 bg-page pb-24">

      {/* ══════════════════════════════════════════════════════════
          HERO — leilão mais quente em destaque
      ══════════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-zinc-950">
        {/* Background blur image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={featured.product.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 blur-2xl scale-110"
          />
        </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-0 lg:grid-cols-2">
          {/* Texto + painel de lance */}
          <div className="flex flex-col justify-center px-6 py-14 lg:py-20 lg:pr-12">
            {/* Badge destaque */}
            <div className="mb-5 flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                Leilão mais disputado
              </span>
              {urgencyBadge(featured.minutesLeft, featured.endsIn)}
            </div>

            <h1 className="font-display text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
              {featured.product.name}
            </h1>
            <p className="mt-2 text-sm text-white/60">Remodelado · Certificado · 12 meses de garantia</p>

            {/* Painel de lance */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Lance atual</p>
              <p className="mt-1 font-accent text-4xl font-bold tracking-tight text-white">
                {formatKz(featured.currentBid)}
              </p>
              <div className="mt-3 flex items-center gap-4 text-sm text-white/60">
                <span>{featured.bids} lances</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-white/30" />
                <span>{featured.participants} participantes</span>
              </div>
              <Link
                href={`/leiloes/${featured.product.id}`}
                className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-white font-accent text-[15px] font-bold text-zinc-950 transition-colors hover:bg-zinc-100"
              >
                Entrar no leilão →
              </Link>
              <p className="mt-3 text-center text-xs text-white/40">Termina em {featured.endsIn}</p>
            </div>
          </div>

          {/* Imagem do produto */}
          <div className="relative hidden min-h-[500px] lg:block">
            <Image
              src={featured.product.image}
              alt={featured.product.name}
              fill
              priority
              sizes="50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          LISTAGEM — A decorrer agora
      ══════════════════════════════════════════════════════════ */}
      <section id="a-decorrer" className="mx-auto w-full max-w-7xl scroll-mt-8 px-6 pt-14">
        {/* Cabeçalho da secção */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">A decorrer agora</h2>
            <span className="flex items-center gap-1.5 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
              {auctions.length} ativos
            </span>
          </div>
          <p className="hidden text-sm text-zinc-500 sm:block">Ordenados por actividade</p>
        </div>

        {/* Grid de cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map(({ product, currentBid, bids, participants, endsIn, minutesLeft }) => (
            <article
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-200/80"
            >
              {/* Imagem */}
              <Link href={`/leiloes/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-zinc-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Overlay suave no hover */}
                <div className="absolute inset-0 bg-zinc-950/0 transition-colors duration-300 group-hover:bg-zinc-950/5" />

                {/* Badge de tempo — canto superior direito */}
                <div className="absolute right-3 top-3">
                  {urgencyBadge(minutesLeft, endsIn)}
                </div>

                {/* Watchlist heart — canto superior esquerdo */}
                <button
                  type="button"
                  aria-label="Adicionar aos favoritos"
                  className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-zinc-400 opacity-0 backdrop-blur-sm transition-all duration-200 hover:text-rose-500 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16" aria-hidden>
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.885.838-3.362.314-4.385C13.486.878 10.4.281 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                  </svg>
                </button>
              </Link>

              {/* Corpo do card */}
              <div className="flex flex-1 flex-col p-5">
                {/* Barra de actividade */}
                <ActivityBar bids={bids} max={maxBids} />

                <div className="mt-4 flex-1">
                  <Link href={`/leiloes/${product.id}`}>
                    <h3 className="text-[15px] font-semibold leading-snug text-zinc-950 transition-colors hover:text-violet-700">
                      {product.name} <span className="font-normal text-zinc-500">remodelado</span>
                    </h3>
                  </Link>
                  <p className="mt-0.5 text-xs text-zinc-500">Certificado · 12 meses garantia</p>
                </div>

                {/* Lance + estatísticas */}
                <div className="mt-4 flex items-end justify-between gap-2 border-t border-zinc-100 pt-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Lance atual</p>
                    <p className="font-accent text-xl font-bold tracking-tight text-zinc-950">
                      {formatKz(currentBid)}
                    </p>
                  </div>
                  <div className="text-right text-xs text-zinc-500">
                    <p className="font-semibold text-zinc-700">{bids} lances</p>
                    <p>{participants} participantes</p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/leiloes/${product.id}`}
                  className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 font-accent text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" aria-hidden>
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
                  Ver leilão
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          REGRAS
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Como funcionam os leilões</h2>
          <p className="mt-2 text-sm text-zinc-500">Simples, transparente e seguro.</p>
        </div>
        <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {rules.map((rule, i) => (
            <li
              key={rule.title}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{rule.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-zinc-600">{rule.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-3xl px-6 pt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Perguntas frequentes.</h2>
        <FaqList faqs={leilaoFaqs} />
      </section>
    </main>
  );
}
