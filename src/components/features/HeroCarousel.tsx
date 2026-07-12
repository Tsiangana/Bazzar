'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { lifestyleImages } from '@/lib/data/products';

const slides = [
  {
    image: lifestyleImages.hero,
    alt: 'iPhone remodelado',
    imagePosition: 'object-[75%_center]',
    from: 'from-violet-950',
    via: 'via-violet-900/60',
    title: (
      <>
        Não deixes para amanhã
        <br />o que podes trocar <i className="font-light">hoje</i>.
      </>
    ),
    description: 'O iPhone remodelado, por muito menos do que novo.',
    href: '/comprar',
    cta: 'Compra agora',
  },
  {
    image: lifestyleImages.offers,
    alt: 'Ofertas em iPhones selecionados',
    imagePosition: 'object-[65%_center]',
    from: 'from-indigo-950',
    via: 'via-indigo-900/60',
    title: (
      <>
        Ofertas que fazem
        <br />o teu <i className="font-light">bolso sorrir</i>.
      </>
    ),
    description: 'Descontos exclusivos em iPhones selecionados, todas as semanas.',
    href: '/comprar',
    cta: 'Ver ofertas',
  },
  {
    image: lifestyleImages.categories.tradeIn,
    alt: 'Trade-in do teu iPhone antigo',
    imagePosition: 'object-[70%_center]',
    from: 'from-emerald-950',
    via: 'via-emerald-900/60',
    title: (
      <>
        O teu iPhone antigo
        <br />vale <i className="font-light">mais do que pensas</i>.
      </>
    ),
    description: 'Entrega o teu equipamento usado e paga menos pelo próximo.',
    href: '/trade-in',
    cta: 'Fazer trade-in',
  },
];

const AUTOPLAY_MS = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, [clearTimer]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  function goTo(i: number) {
    setIndex(i);
    startTimer();
  }

  return (
    <>
      <section
        className="relative isolate overflow-hidden bg-violet-950"
        onMouseEnter={clearTimer}
        onMouseLeave={startTimer}
      >
        <div
          className="flex min-h-[240px] transition-transform duration-700 ease-in-out sm:min-h-[270px] lg:min-h-[300px]"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${index * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.href + i}
              className="relative flex w-full shrink-0 items-center"
              style={{ width: `${100 / slides.length}%` }}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover ${slide.imagePosition}`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.from} from-0% ${slide.via} via-35% to-transparent to-60%`}
              />
              <div className="relative mx-auto w-full max-w-7xl px-6 py-6">
                <div className="max-w-md">
                  <h1 className="font-display text-2xl leading-[1.15] font-medium tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {slide.title}
                  </h1>
                  <p className="mt-2 text-sm text-white/80 sm:text-base">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.href}
                    className="mt-4 inline-flex h-9 items-center rounded-lg bg-white px-5 font-accent text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 sm:h-10 sm:text-[15px]"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dots + setas do carrossel do hero */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <span className="flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.href + i}
              type="button"
              aria-label={`Ir para o slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-3 w-3 cursor-pointer rounded-full transition-colors ${
                i === index ? 'bg-zinc-950' : 'border border-zinc-400'
              }`}
            />
          ))}
        </span>
      </div>
    </>
  );
}
