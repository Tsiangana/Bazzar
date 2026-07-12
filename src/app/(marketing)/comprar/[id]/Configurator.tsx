'use client';

import Image from 'next/image';
import { useState } from 'react';

import { formatKz } from '@/lib/utils/format';
import { lifestyleImages, type CatalogProduct } from '@/lib/data/products';

interface Option {
  label: string;
  sublabel?: string;
  delta: number; // diferença de preço face à opção base
  badge?: string;
}

const conditions: Option[] = [
  { label: 'Correto', delta: 0 },
  { label: 'Bom', delta: 19000 },
  { label: 'Excelente', delta: 29000, badge: 'Popular' },
  { label: 'Premium', delta: 45000 },
];

const batteries: Option[] = [
  { label: 'Bateria standard', sublabel: 'Bom para uso diário médio', delta: 0 },
  { label: 'Bateria nova', sublabel: 'Ideal para uso intensivo diário', delta: 215500 },
];

const storages: Option[] = [
  { label: '128 GB', delta: 0 },
  { label: '256 GB', delta: 60000 },
  { label: '512 GB', delta: 150000 },
];

const sims: Option[] = [
  {
    label: 'Dual SIM físico',
    sublabel: '2 ranhuras para SIM físicos (sem eSIM)',
    delta: 83070,
  },
  {
    label: 'eSIM',
    sublabel: '2 ranhuras para SIM virtual (sem ranhura para SIM físico)',
    delta: 19000,
  },
  {
    label: 'SIM físico + eSIM',
    sublabel: '1 ranhura para SIM físico + 1 para SIM virtual',
    delta: 0,
  },
];

const colorNames: Record<string, string> = {
  '#1d1d1f': 'Preto',
  '#f5f5f0': 'Branco',
  '#9bc4bc': 'Verde azulado',
  '#f2c9cf': 'Rosa',
  '#a7b8cc': 'Ultramarino',
  '#f7e96e': 'Amarelo',
  '#d9cfc2': 'Titânio natural',
  '#8a8d91': 'Titânio cinza',
  '#48495c': 'Titânio azul',
  '#e3e4e5': 'Titânio branco',
  '#c9c4bd': 'Deserto',
  '#4e3c56': 'Roxo',
  '#3a5e50': 'Verde',
  '#b23a48': 'Vermelho',
};

function InfoBanner({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-trust px-5 py-4 text-[15px]">
      <span>{text}</span>
      <span aria-hidden className="text-zinc-500">
        ›
      </span>
    </div>
  );
}

function OptionRow({
  option,
  selected,
  onSelect,
  price,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
  price: number;
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative flex w-full flex-col rounded-xl border px-5 py-4 text-left transition-colors ${
        selected
          ? 'border-zinc-950 bg-selected'
          : 'border-zinc-200 bg-white hover:border-zinc-400'
      }`}
    >
      {option.badge && (
        <span className="absolute -top-3 right-4 bg-accent px-2 py-0.5 text-sm font-medium">
          {option.badge}
        </span>
      )}
      <span className="flex w-full items-center justify-between gap-4">
        <span className="flex items-center gap-3 font-semibold">
          <span
            aria-hidden
            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
              selected ? 'border-zinc-950' : 'border-zinc-400'
            }`}
          >
            {selected && <span className="h-2.5 w-2.5 rounded-full bg-zinc-950" />}
          </span>
          {option.label}
        </span>
        <span className="text-[15px]">{formatKz(price)}</span>
      </span>
      {option.sublabel && (
        <span className="mt-1 pl-7 text-sm text-zinc-600">{option.sublabel}</span>
      )}
    </button>
  );
}

function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative hidden min-h-[420px] overflow-hidden rounded-2xl lg:block">
      <Image src={src} alt={alt} fill sizes="45vw" className="object-cover" />
      <span className="absolute top-3 right-3 rounded-full bg-zinc-950/70 px-3 py-1 text-xs text-white">
        Imagem ilustrativa
      </span>
    </div>
  );
}

export function Configurator({ product }: { product: CatalogProduct }) {
  const [condition, setCondition] = useState(0);
  const [battery, setBattery] = useState(0);
  const [storage, setStorage] = useState(0);
  const [sim, setSim] = useState(2);
  const [color, setColor] = useState(0);

  const total =
    product.price +
    conditions[condition].delta +
    batteries[battery].delta +
    storages[storage].delta +
    sims[sim].delta;
  const savings = product.newPrice - total;

  const sections: {
    title: string;
    banner: string;
    image: string;
    options: Option[];
    value: number;
    set: (i: number) => void;
  }[] = [
    {
      title: 'Seleciona a condição',
      banner:
        'Todos os dispositivos são inspecionados por profissionais e têm garantia de funcionamento a 100%. Comparar condições',
      image: lifestyleImages.pdp.body,
      options: conditions,
      value: condition,
      set: setCondition,
    },
    {
      title: 'Seleciona uma opção de bateria',
      banner:
        'Todos os dispositivos têm a garantia de uma bateria de excelente qualidade. Mais informações.',
      image: lifestyleImages.pdp.battery,
      options: batteries,
      value: battery,
      set: setBattery,
    },
    {
      title: 'Seleciona o armazenamento',
      banner: 'Fotos, vídeos e apps: escolhe o espaço certo para o teu dia a dia.',
      image: lifestyleImages.pdp.screen,
      options: storages,
      value: storage,
      set: setStorage,
    },
    {
      title: 'Seleciona o tipo de SIM',
      banner: 'Qual é o tipo de SIM certo para ti?',
      image: lifestyleImages.pdp.sim,
      options: sims,
      value: sim,
      set: setSim,
    },
  ];

  return (
    <div className="flex flex-col gap-16">
      {sections.map((section) => (
        <section
          key={section.title}
          className="grid grid-cols-1 gap-10 lg:grid-cols-2"
        >
          <SectionImage src={section.image} alt={section.title} />
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              {section.title}
            </h2>
            <div className="mt-5">
              <InfoBanner text={section.banner} />
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {section.options.map((option, i) => (
                <OptionRow
                  key={option.label}
                  option={option}
                  selected={section.value === i}
                  onSelect={() => section.set(i)}
                  price={
                    total - section.options[section.value].delta + option.delta
                  }
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Cor */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <SectionImage src={product.image} alt={product.name} />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Seleciona a cor
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {product.colors.map((hex, i) => (
              <button
                key={hex}
                onClick={() => setColor(i)}
                className={`flex flex-col rounded-xl border px-5 py-4 text-left ${
                  color === i
                    ? 'border-zinc-950 bg-selected'
                    : 'border-zinc-200 bg-white hover:border-zinc-400'
                }`}
              >
                <span className="flex items-center gap-3 font-semibold">
                  <span
                    aria-hidden
                    className="h-4 w-4 rounded-full border border-zinc-300"
                    style={{ backgroundColor: hex }}
                  />
                  {colorNames[hex] ?? 'Cor especial'}
                </span>
                <span className="mt-1 pl-7 text-[15px] text-zinc-700">
                  {formatKz(total)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resumo */}
      <section className="lg:ml-auto lg:w-1/2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-7">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            {product.name}
            <span
              aria-hidden
              className="h-3.5 w-3.5 rounded-full border border-zinc-300"
              style={{ backgroundColor: product.colors[color] }}
            />
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              conditions[condition].label,
              batteries[battery].label,
              storages[storage].label,
              sims[sim].label,
              colorNames[product.colors[color]] ?? 'Cor especial',
            ].map((chip) => (
              <span
                key={chip}
                className="rounded border border-zinc-300 px-2 py-0.5 text-sm font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-5 text-3xl font-bold tracking-tight">
            {formatKz(total)}
          </p>
          <p className="mt-1 text-[15px] text-zinc-600">
            <s>{formatKz(product.newPrice)}</s> novo{' '}
            <span className="ml-2 rounded bg-green-100 px-2 py-0.5 font-semibold text-green-900">
              Poupa {formatKz(savings)}
            </span>
          </p>
          <button className="mt-6 h-13 w-full cursor-pointer rounded-lg bg-zinc-950 font-accent text-[17px] font-semibold text-white transition-colors hover:bg-zinc-700">
            Comprar
          </button>
          <p className="mt-4 text-center text-sm text-zinc-600">
            Envio gratuito · 30 dias para devolução · 12 meses de garantia
          </p>
        </div>
      </section>
    </div>
  );
}
