import type { Metadata } from 'next';

import { catalogProducts } from '@/lib/data/products';

import { TradeInWizard } from './TradeInWizard';

export const metadata: Metadata = {
  title: 'Começar o Trade-In',
  description:
    'Escolhe o teu próximo iPhone, avalia o atual e paga apenas a diferença.',
};

export default function ComecarTradeInPage() {
  return (
    <main className="flex-1 bg-page">
      <TradeInWizard products={catalogProducts} />
    </main>
  );
}
