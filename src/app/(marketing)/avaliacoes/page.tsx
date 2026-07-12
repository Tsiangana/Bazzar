import type { Metadata } from 'next';
import Image from 'next/image';

import { RatingStars } from '@/components/ui/RatingStars';
import { catalogProducts, lifestyleImages } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'Avaliações de clientes',
  description: 'O que dizem os clientes que já compraram, venderam ou trocaram o seu iPhone na iphonesAO.',
};

const reviews = [
  {
    name: 'Adilson M.',
    rating: 5,
    text: 'Correu tudo bem, envio super rápido. O telemóvel veio impecável, parece novo e a bateria está a 100%.',
    product: 'iPhone 13 Pro 512GB — Verde',
    image: lifestyleImages.testimonials[0],
    thumb: catalogProducts[10].image,
  },
  {
    name: 'Lúcia F.',
    rating: 5,
    text: 'O telefone chegou dois dias depois da encomenda — extremamente rápido, bem acondicionado e com o tracking preciso.',
    product: 'iPhone 15 128GB — Rosa',
    image: lifestyleImages.testimonials[1],
    thumb: catalogProducts[3].image,
  },
  {
    name: 'Bruno R.',
    rating: 4.5,
    text: 'Fiz trade-in do meu iPhone 12 e a diferença que paguei pelo 15 Pro foi mínima. Processo transparente do início ao fim.',
    product: 'iPhone 15 Pro 256GB — Titânio',
    image: lifestyleImages.testimonials[2],
    thumb: catalogProducts[6].image,
  },
  {
    name: 'Marta V.',
    rating: 5,
    text: 'Ganhei um leilão e o equipamento veio com os acessórios todos, na caixa original e em perfeitas condições.',
    product: 'iPhone 14 Pro 128GB — Roxo',
    image: lifestyleImages.testimonials[3],
    thumb: catalogProducts[9].image,
  },
];

export default function AvaliacoesPage() {
  return (
    <main className="flex-1 bg-page">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl font-medium tracking-tight text-zinc-950 sm:text-5xl">
            Avaliações de clientes
          </h1>
          <p className="max-w-2xl text-lg text-zinc-700">
            Histórias reais de quem já comprou, vendeu ou trocou o seu iPhone
            na iphonesAO.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
            >
              <div className="relative h-72">
                <Image
                  src={review.image}
                  alt={review.product}
                  fill
                  sizes="(max-width: 1024px) 90vw, 300px"
                  className="object-cover"
                />
                <figcaption className="absolute top-3 left-3 rounded bg-white px-2 py-0.5 text-sm font-semibold">
                  {review.name}
                </figcaption>
                <div className="absolute inset-x-0 bottom-0 bg-zinc-950/80 p-4 text-white">
                  <p className="text-sm leading-5">{review.text}</p>
                  <RatingStars rating={review.rating} className="mt-2 !text-white" />
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <span className="relative h-12 w-9 shrink-0">
                  <Image
                    src={review.thumb}
                    alt=""
                    fill
                    sizes="36px"
                    className="rounded object-cover"
                  />
                </span>
                <span className="text-sm font-medium">{review.product}</span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
