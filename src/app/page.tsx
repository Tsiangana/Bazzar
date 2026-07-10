import Image from 'next/image';
import Link from 'next/link';

import { ProductCard } from '@/components/features/products/ProductCard';
import { catalogProducts, lifestyleImages } from '@/lib/data/products';

const trustItems = [
  { icon: '✓', label: 'Inspeção técnica profissional' },
  { icon: '🛡', label: 'Garantia de 12 meses' },
  { icon: '📦', label: '30 dias para devolver' },
  { icon: '📱', label: 'Especialistas em iPhone' },
];

const categories = [
  { label: 'iPhone Pro', image: lifestyleImages.categories.pro, href: '/comprar' },
  { label: 'iPhone', image: lifestyleImages.categories.standard, href: '/comprar' },
  { label: 'Modelos clássicos', image: lifestyleImages.categories.classic, href: '/comprar' },
  { label: 'iPhone SE', image: lifestyleImages.categories.se, href: '/comprar' },
  { label: 'Trade-In', image: lifestyleImages.categories.tradeIn, href: '/trade-in' },
  { label: 'Leilões', image: lifestyleImages.categories.auctions, href: '/leiloes' },
  { label: 'Acessórios', image: lifestyleImages.categories.accessories, href: '/comprar' },
  { label: 'Boas ofertas', image: lifestyleImages.categories.deals, href: '/comprar' },
];

const verifiedChecklist = [
  ['Inspeção profissional de', '25 pontos'],
  ['Standard de qualidade', 'rigoroso que te protege'],
  ['Técnicos especializados', 'em iPhone'],
  ['Peças e baterias', 'verificadas'],
  ['Garantia incluída', 'com cada compra'],
  ['30 dias', 'para mudares de ideias'],
] as const;

const testimonials = [
  {
    name: 'Adilson M.',
    text: 'Correu tudo bem, envio super rápido. O telemóvel veio impecável, parece novo e a bateria está a 100%.',
    product: 'iPhone 13 Pro 512GB — Verde',
    image: lifestyleImages.testimonials[0],
    thumb: catalogProducts[10].image,
  },
  {
    name: 'Lúcia F.',
    text: 'O telefone chegou dois dias depois da encomenda — extremamente rápido, bem acondicionado e com o tracking preciso.',
    product: 'iPhone 15 128GB — Rosa',
    image: lifestyleImages.testimonials[1],
    thumb: catalogProducts[3].image,
  },
  {
    name: 'Bruno R.',
    text: 'Fiz trade-in do meu iPhone 12 e a diferença que paguei pelo 15 Pro foi mínima. Processo transparente do início ao fim.',
    product: 'iPhone 15 Pro 256GB — Titânio',
    image: lifestyleImages.testimonials[2],
    thumb: catalogProducts[6].image,
  },
  {
    name: 'Marta V.',
    text: 'Ganhei um leilão e o equipamento veio com os acessórios todos, na caixa original e em perfeitas condições.',
    product: 'iPhone 14 Pro 128GB — Roxo',
    image: lifestyleImages.testimonials[3],
    thumb: catalogProducts[9].image,
  },
];

const faqs = [
  {
    q: 'Como sei que o dispositivo vai funcionar?',
    a: 'Todos os equipamentos passam por uma inspeção técnica de 25 pontos feita pelos nossos especialistas, com relatório publicado na página do produto e garantia de 12 meses.',
  },
  {
    q: 'Qual é a diferença entre remodelado e novo?',
    a: 'Um remodelado é um iPhone usado que foi inspecionado, limpo e reparado (quando necessário) pela nossa equipa. Funciona na perfeição e custa muito menos do que um novo.',
  },
  {
    q: 'O que posso encontrar na iphonesAO?',
    a: 'iPhones novos, usados e remodelados, além dos serviços de trade-in, venda direta à empresa e leilões de equipamentos especiais.',
  },
  {
    q: 'Como funciona o Trade-In?',
    a: 'Escolhes o teu novo iPhone, descreves o estado do teu equipamento atual e recebes uma estimativa imediata. Após a inspeção, o valor é descontado na compra.',
  },
  {
    q: 'Posso vender o meu iPhone sem comprar outro?',
    a: 'Sim. Pedes uma avaliação, recebes uma estimativa, envias o equipamento e, após a inspeção, recebes o pagamento diretamente.',
  },
];

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
  const deals = catalogProducts.slice(0, 4);
  const recommended = catalogProducts.slice(4, 8);

  return (
    <main className="flex flex-1 flex-col bg-page">
      {/* Hero */}
      <section className="bg-accent">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-tight text-zinc-950 sm:text-6xl">
              Não deixes para amanhã
              <br />o que podes trocar <i className="font-light">hoje</i>.
            </h1>
            <p className="mt-5 text-lg text-zinc-900">
              O iPhone remodelado, por muito menos do que novo.
            </p>
            <Link
              href="/comprar"
              className="mt-7 inline-flex h-13 items-center rounded-lg bg-zinc-950 px-7 text-[17px] font-semibold text-white transition-colors hover:bg-zinc-700"
            >
              Compra agora
            </Link>
          </div>
          <div className="relative mx-auto h-80 w-full max-w-lg">
            <Image
              src={lifestyleImages.hero}
              alt="iPhone remodelado"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 512px"
              className="rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Dots + setas do carrossel do hero */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <span className="flex gap-2" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-zinc-950" />
          <span className="h-2 w-2 rounded-full border border-zinc-400" />
          <span className="h-2 w-2 rounded-full border border-zinc-400" />
        </span>
        <CarouselArrows />
      </div>

      {/* Título + barra de confiança */}
      <section className="mx-auto w-full max-w-7xl px-6 pt-10 pb-16 text-center">
        <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          A tecnologia que não se perde, renova-se.
        </h2>
        <p className="mt-3 text-zinc-700">
          Compra e vende enquanto preservas o meio ambiente.
        </p>
        <ul className="mt-8 flex flex-col justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-6 py-4 text-[15px] font-medium sm:flex-row">
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
        <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex flex-col items-center gap-4 rounded-2xl bg-accent p-6 transition-transform hover:-translate-y-0.5"
            >
              <span className="relative h-40 w-full">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 1024px) 45vw, 280px"
                  className="rounded-xl object-cover"
                />
              </span>
              <span className="pb-1 text-lg font-semibold">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recomendado */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <h2 className="text-xl font-semibold">Recomendado para ti</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Melhores ofertas */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <h2 className="text-xl font-semibold">
          Aproveita as nossas melhores ofertas
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-0 overflow-hidden rounded-2xl lg:grid-cols-[2fr_3fr]">
          <div className="relative min-h-72">
            <Image
              src={lifestyleImages.offers}
              alt="As nossas melhores ofertas"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 bg-white p-8">
            <div className="flex flex-wrap gap-3">
              {['iPhone', 'Pro', 'Plus', 'mini', 'SE'].map((chip, i) => (
                <span
                  key={chip}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                    i === 0
                      ? 'border-zinc-950'
                      : 'border-zinc-200 text-zinc-700'
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {deals.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-end">
              <CarouselArrows />
            </div>
          </div>
        </div>
      </section>

      {/* Remodelado verificado */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-6">
        <div className="grid grid-cols-1 items-center gap-10 rounded-2xl bg-beige px-10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              O que é um
              <br />
              <i className="underline decoration-accent decoration-8 underline-offset-4">
                Remodelado verificado?
              </i>
            </h2>
            <p className="mt-4 text-lg text-zinc-700">
              Como é que te garantimos qualidade.
            </p>
          </div>
          <ul className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm">
            {verifiedChecklist.map(([bold, rest]) => (
              <li key={bold} className="flex items-center gap-3 text-[15px]">
                <span
                  aria-hidden
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-900 text-xs"
                >
                  ✓
                </span>
                <span>
                  <strong className="font-semibold">{bold}</strong> {rest}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between py-4">
          <span className="flex gap-2" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-zinc-950" />
            <span className="h-2 w-2 rounded-full border border-zinc-400" />
            <span className="h-2 w-2 rounded-full border border-zinc-400" />
            <span className="h-2 w-2 rounded-full border border-zinc-400" />
          </span>
          <CarouselArrows />
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
        <h2 className="font-display text-5xl leading-tight font-medium tracking-tight sm:text-6xl">
          Damos uma segunda vida a cada iPhone.
        </h2>
        <p className="mt-4 text-lg text-zinc-700">
          Acreditamos num mundo que faz mais com o que já temos.
        </p>
      </section>

      {/* Testemunhos */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Vê o que dizem os nossos clientes
          </h2>
          <CarouselArrows />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
            >
              <div className="relative h-72">
                <Image
                  src={t.image}
                  alt={t.product}
                  fill
                  sizes="(max-width: 1024px) 90vw, 300px"
                  className="object-cover"
                />
                <figcaption className="absolute top-3 left-3 rounded bg-white px-2 py-0.5 text-sm font-semibold">
                  {t.name}
                </figcaption>
                <div className="absolute inset-x-0 bottom-0 bg-zinc-950/80 p-4 text-white">
                  <p className="text-sm leading-5">{t.text}</p>
                  <p className="mt-2 text-sm font-semibold">★★★★★ 5/5</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <span className="relative h-12 w-9 shrink-0">
                  <Image
                    src={t.thumb}
                    alt=""
                    fill
                    sizes="36px"
                    className="rounded object-cover"
                  />
                </span>
                <span className="text-sm font-medium">{t.product}</span>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-3xl px-6">
          <h2 className="text-2xl font-semibold">
            As 5 perguntas que mais nos fazem.
          </h2>
          <div className="mt-6 flex flex-col">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border-b border-zinc-200 py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    aria-hidden
                    className="text-zinc-500 transition-transform group-open:rotate-180"
                  >
                    ⌄
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-7 text-zinc-700">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Imprensa */}
      <section className="bg-page py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">O que dizem sobre nós!</h2>
              <p className="text-zinc-600">Só coisas boas, é claro!</p>
            </div>
            <CarouselArrows />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {press.map((item) => (
              <blockquote
                key={item.outlet}
                className="flex flex-col items-center gap-5 rounded-2xl bg-white p-10 text-center shadow-sm"
              >
                <span className="bg-zinc-950 px-3 py-1 font-display text-lg font-semibold text-white">
                  {item.outlet}
                </span>
                <p className="text-lg leading-7 font-medium">{item.quote}</p>
                <footer className="text-sm text-zinc-500">{item.date}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
