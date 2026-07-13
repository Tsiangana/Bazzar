import Image from 'next/image';
import Link from 'next/link';

import { BestSellersCarousel } from '@/components/features/BestSellersCarousel';
import { FaqList } from '@/components/features/FaqList';
import { HeroCarousel } from '@/components/features/HeroCarousel';
import { ProductCard } from '@/components/features/products/ProductCard';
import { faqs } from '@/lib/data/faqs';
import { catalogProducts, lifestyleImages } from '@/lib/data/products';

const trustItems = [
  { icon: '✓', label: 'Qualidade garantida' },
  { icon: '✓', label: 'Trocas seguras' },
  { icon: '✓', label: 'Entrega rápida' },
  { icon: '✓', label: 'Seu iPhone em ótimas condições' },
];

const categories = [
  { label: 'Comprar iPhones', image: lifestyleImages.categories.pro, href: '/comprar' },
  { label: 'Trocas de Celular', image: lifestyleImages.categories.standard, href: '/comprar' },
  { label: 'Avaliar meu celular', image: lifestyleImages.categories.tradeIn, href: '/trade-in' },
  { label: 'Leilões', image: lifestyleImages.categories.auctions, href: '/leiloes' },
];

const verifiedChecklist = [
  ['Inspeção profissional de', '25 pontos'],
  ['Standard de qualidade', 'rigoroso que te protege'],
  ['Técnicos especializados', 'em iPhone'],
  ['Peças e baterias', 'verificadas'],
  ['Garantia incluída', 'com cada compra'],
  ['30 dias', 'para mudares de ideias'],
] as const;

const press = [
  {
    outlet: 'Tech Angola',
    quote: '«Investir em tecnologia remodelada é investir no planeta»',
    date: '08/2025',
  },
  {
    outlet: 'Negócios AO',
    quote: '«A plataforma que está a mudar a forma como Angola compra iPhones»',
    date: '01/2026',
  },
  {
    outlet: 'Digital Luanda',
    quote: '«iphonesAO dá uma segunda vida aos gadgets»',
    date: '03/2026',
  },
];

function CarouselArrows() {
  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Anterior"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-200 text-zinc-500"
      >
        ‹
      </button>
      <button
        aria-label="Seguinte"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-white"
      >
        ›
      </button>
    </div>
  );
}

export default function Home() {
  const recommended = catalogProducts.slice(4, 8);
  const bestSellers = [...catalogProducts]
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, 8);

  return (
    <main className="flex flex-1 flex-col bg-page">
      {/* Hero */}
      <HeroCarousel />

      {/* Título + barra de confiança */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-10 pb-16 text-center">
        <h2 className="font-playwrite text-4xl leading-normal font-medium tracking-tight sm:text-5xl">
          Para que pagar por um novo ! se pode troca-lo
        </h2>
        <p className="mt-6 text-zinc-700">
          Compra, troca e poupe menos.
        </p>
        <ul className="mt-8 flex flex-col justify-between gap-3 rounded-xl bg-white px-6 py-4 text-[15px] font-medium sm:flex-row">
          {trustItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-950 text-xs text-white"
              >
                {item.icon}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </section>

      {/* Categorias */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <h2 className="text-xl font-semibold">Categorias mais procuradas</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex flex-col items-center gap-3 rounded-2xl bg-accent p-4 sm:gap-4 sm:p-6"
            >
              <span className="relative h-40 w-full overflow-hidden rounded-xl">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 1024px) 45vw, 280px"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </span>
              <span className="pb-1 text-sm font-semibold sm:text-lg">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recomendado */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <h2 className="text-xl font-semibold">Recomendado para ti</h2>
        <div className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {recommended.map((product) => (
            <div
              key={product.id}
              className="w-[78%] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Avaliação / Trade-In */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <h2 className="text-xl font-semibold">Trade-In</h2>
        <div className="mt-5 grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-[3fr_2fr]">
          <div className="relative min-h-72">
            <Image
              src={lifestyleImages.categories.tradeIn}
              alt="Avalia o teu iPhone"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-5 bg-accent p-8">
            <h3 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Avalia o teu iPhone agora
            </h3>
            <p className="text-zinc-900">
              Diz-nos o estado do teu iPhone atual e recebe uma estimativa
              imediata. Usa esse valor para pagar menos no próximo.
            </p>
            <ul className="flex flex-col gap-2 text-[15px] font-medium">
              {[
                'Escolhe o modelo e o estado',
                'Recebe uma estimativa na hora',
                'Entrega o equipamento e recebe o desconto',
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                href="/trade-in/comecar"
                className="inline-flex h-11 items-center rounded-lg bg-zinc-950 px-6 font-accent text-[15px] font-semibold text-white transition-colors hover:bg-zinc-700"
              >
                Avaliar o meu iPhone
              </Link>
              <Link
                href="/trade-in"
                className="text-[15px] font-semibold underline decoration-2 underline-offset-4 hover:text-zinc-600"
              >
                Como funciona →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16 text-center">
        <h2 className="font-playwrite text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
          Não deixes para amanhã o que podes trocar hoje
        </h2>
        <p className="mt-4 text-lg text-zinc-700">
          O iPhone remodelado, por muito menos do que novo.
        </p>
      </section>

      {/* Mais vendidos */}
      <BestSellersCarousel products={bestSellers} />

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <h2 className="text-2xl font-semibold">
            Perguntas frequentes.
          </h2>
          <FaqList faqs={faqs} />
        </div>
      </section>
    </main>
  );
}
