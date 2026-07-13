import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProduct } from '@/lib/data/products';
import { formatKz } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'Leilão — iPhonesAO',
};

/* ─── Mock por produto ────────────────────────────────────────── */
function getAuctionData(price: number, index: number) {
  return {
    currentBid: Math.round(price * (0.68 + index * 0.02)),
    bids: 42 - index * 5,
    participants: 18 - index * 2,
    endsIn: ['1h 22m', '2h 50m', '5h 10m', '1d 4h'][Math.min(index, 3)],
    minutesLeft: [82, 170, 310, 1680][Math.min(index, 3)],
    bidHistory: [
      { user: 'Miguel S.', amount: Math.round(price * 0.71), time: 'há 4 min' },
      { user: 'Ana P.', amount: Math.round(price * 0.69), time: 'há 11 min' },
      { user: 'Carlos M.', amount: Math.round(price * 0.67), time: 'há 18 min' },
      { user: 'Sara L.', amount: Math.round(price * 0.65), time: 'há 29 min' },
      { user: 'João F.', amount: Math.round(price * 0.63), time: 'há 44 min' },
    ],
  };
}

/* ─── Componente de countdown ─────────────────────────────────── */
function CountdownBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-zinc-100 px-4 py-3">
      <span className="font-accent text-2xl font-bold tabular-nums text-zinc-950">{value}</span>
      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{label}</span>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default async function LeilaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  // Simula índice com base no id para variar os dados
  const index = ['iphone-16', 'iphone-16-plus', 'iphone-15-plus', 'iphone-16-pro-max'].indexOf(id);
  const auction = getAuctionData(product.price, Math.max(0, index));

  const isUrgent = auction.minutesLeft < 180;
  const isWarning = !isUrgent && auction.minutesLeft < 1440;

  return (
    <main className="flex-1 bg-page pb-24">
      <div className="mx-auto w-full max-w-7xl px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-5 text-sm text-zinc-500">
          <Link href="/" className="transition-colors hover:text-zinc-950">Início</Link>
          <span aria-hidden className="text-zinc-300">›</span>
          <Link href="/leiloes" className="transition-colors hover:text-zinc-950">Leilões</Link>
          <span aria-hidden className="text-zinc-300">›</span>
          <span className="text-zinc-950">{product.name}</span>
        </nav>

        {/* Layout principal */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">

          {/* ── Coluna esquerda — galeria ── */}
          <div>
            {/* Imagem principal */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 60vw"
                className="object-cover"
              />
              {/* Badge urgência */}
              <div className="absolute left-4 top-4">
                {isUrgent ? (
                  <span className="flex items-center gap-2 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-bold text-white">
                    <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    A terminar em {auction.endsIn}
                  </span>
                ) : isWarning ? (
                  <span className="flex items-center gap-2 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-white">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    Termina em {auction.endsIn}
                  </span>
                ) : (
                  <span className="flex items-center gap-2 rounded-full bg-zinc-900/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" viewBox="0 0 16 16" aria-hidden>
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                    </svg>
                    Termina em {auction.endsIn}
                  </span>
                )}
              </div>
            </div>

            {/* Info do produto */}
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
              <h1 className="font-display text-2xl font-medium tracking-tight text-zinc-950 sm:text-3xl">
                {product.name}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600">Remodelado</span>
                <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600">Certificado iPhonesAO</span>
                <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600">12 meses garantia</span>
                <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600">Envio rastreado</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
                Este equipamento foi inspecionado pelos nossos técnicos, recondicionado segundo os mais elevados padrões
                e certificado pela iPhonesAO. Inclui garantia de 12 meses e envio gratuito para todo o território nacional.
              </p>
            </div>

            {/* Histórico de lances */}
            <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Histórico de lances</h2>
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                  {auction.bids} lances no total
                </span>
              </div>
              <ul className="mt-4 divide-y divide-zinc-100">
                {auction.bidHistory.map((entry, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar placeholder */}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600">
                        {entry.user[0]}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-950">{entry.user}</p>
                        <p className="text-xs text-zinc-500">{entry.time}</p>
                      </div>
                    </div>
                    <span className={`font-accent text-sm font-bold ${i === 0 ? 'text-violet-700' : 'text-zinc-700'}`}>
                      {formatKz(entry.amount)}
                      {i === 0 && <span className="ml-1 text-[10px] font-semibold text-violet-500 uppercase tracking-wide"> ★ líder</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Coluna direita — painel de lance (sticky) ── */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">

              {/* Lance atual */}
              <div className="border-b border-zinc-100 pb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Lance atual</p>
                <p className="mt-1 font-accent text-4xl font-bold tracking-tight text-zinc-950">
                  {formatKz(auction.currentBid)}
                </p>
                <div className="mt-2 flex items-center gap-3 text-sm text-zinc-500">
                  <span className="font-medium text-zinc-700">{auction.bids} lances</span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-zinc-300" />
                  <span>{auction.participants} participantes</span>
                </div>
              </div>

              {/* Countdown */}
              <div className="border-b border-zinc-100 py-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">Tempo restante</p>
                <div className="flex items-center gap-2">
                  {auction.minutesLeft < 1440 ? (
                    <>
                      <CountdownBlock label="horas" value={String(Math.floor(auction.minutesLeft / 60)).padStart(2, '0')} />
                      <span className="pb-3 text-xl font-bold text-zinc-300">:</span>
                      <CountdownBlock label="min" value={String(auction.minutesLeft % 60).padStart(2, '0')} />
                      <span className="pb-3 text-xl font-bold text-zinc-300">:</span>
                      <CountdownBlock label="seg" value="00" />
                    </>
                  ) : (
                    <>
                      <CountdownBlock label="dias" value={String(Math.floor(auction.minutesLeft / 1440)).padStart(2, '0')} />
                      <span className="pb-3 text-xl font-bold text-zinc-300">:</span>
                      <CountdownBlock label="horas" value={String(Math.floor((auction.minutesLeft % 1440) / 60)).padStart(2, '0')} />
                      <span className="pb-3 text-xl font-bold text-zinc-300">:</span>
                      <CountdownBlock label="min" value={String(auction.minutesLeft % 60).padStart(2, '0')} />
                    </>
                  )}
                </div>
                {isUrgent && (
                  <p className="mt-3 text-xs font-semibold text-rose-600">
                    ⚡ A terminar em breve — não percas!
                  </p>
                )}
              </div>

              {/* Formulário de lance */}
              <div className="pt-5">
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400" htmlFor="bid-amount">
                  O teu lance (mín. {formatKz(auction.currentBid + 5000)})
                </label>
                <div className="mt-2 flex items-center overflow-hidden rounded-xl border border-zinc-300 bg-zinc-50 transition-shadow focus-within:border-zinc-950 focus-within:ring-2 focus-within:ring-zinc-950/10">
                  <span className="select-none pl-4 text-sm font-semibold text-zinc-500">Kz</span>
                  <input
                    id="bid-amount"
                    type="number"
                    min={auction.currentBid + 5000}
                    step={5000}
                    placeholder={String(auction.currentBid + 5000)}
                    className="w-full bg-transparent py-3 pl-2 pr-4 text-sm font-semibold text-zinc-950 outline-none placeholder:font-normal placeholder:text-zinc-400"
                  />
                </div>

                <button
                  type="button"
                  className="mt-4 flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-950 font-accent text-[15px] font-bold text-white transition-colors hover:bg-zinc-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16" aria-hidden>
                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L9.793 8 7.146 5.354a.5.5 0 1 1 .708-.708z"/>
                    <path d="M4.146 7.146a.5.5 0 0 1 0 .708L1.5 10.5a.5.5 0 0 1-.708-.708L3.086 8 .792 5.354a.5.5 0 1 1 .708-.708l3 3z"/>
                    <path d="M6.5 1.5A1.5 1.5 0 0 1 8 0h3.5a1.5 1.5 0 0 1 0 3H8a1.5 1.5 0 0 1-1.5-1.5"/>
                  </svg>
                  Dar lance
                </button>

                {/* Segurança */}
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-zinc-50 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="mt-0.5 shrink-0 text-zinc-400" viewBox="0 0 16 16" aria-hidden>
                    <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                    <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                  </svg>
                  <p className="text-xs leading-5 text-zinc-500">
                    Ao dar o lance confirmas que aceitas as <Link href="/termos-de-servico" className="underline underline-offset-2 hover:text-zinc-700">condições do leilão</Link>. O pagamento só é efetuado se ganhares.
                  </p>
                </div>
              </div>
            </div>

            {/* Garantias */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { icon: '🔍', label: 'Inspecionado' },
                { icon: '🛡️', label: '12 meses garantia' },
                { icon: '📦', label: 'Envio rastreado' },
                { icon: '↩️', label: '30 dias devolução' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3">
                  <span className="text-base">{icon}</span>
                  <span className="text-xs font-semibold text-zinc-700">{label}</span>
                </div>
              ))}
            </div>

            {/* Link voltar */}
            <Link
              href="/leiloes"
              className="mt-5 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16" aria-hidden>
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
              Ver todos os leilões
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
