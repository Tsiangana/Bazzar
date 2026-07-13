import type { Metadata } from 'next';

import { catalogProducts } from '@/lib/data/products';

import { SellWizard } from './SellWizard';

export const metadata: Metadata = {
  title: 'Vender o meu iPhone',
  description:
    'Avalia o teu iPhone, recebe uma estimativa e escolhe entre venda direta ou leilão na plataforma.',
};

export default function ComecarVendaPage() {
  return (
    <main className="flex-1 bg-page">
      <SellWizard products={catalogProducts} />
    </main>
  );
}
