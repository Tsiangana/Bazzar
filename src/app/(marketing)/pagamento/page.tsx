import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';

export const metadata: Metadata = {
  title: 'Pagamento',
  description: 'Formas de pagamento aceites na iphonesAO e como funciona a cobrança.',
};

export default function PagamentoPage() {
  return (
    <SimplePageLayout
      title="Pagamento"
      intro="Formas de pagamento disponíveis e como funciona o processo de cobrança na iphonesAO."
      sections={[
        {
          heading: 'Formas de pagamento aceites',
          body: [
            'Aceitamos Multicaixa Express, transferência bancária e pagamento na entrega (disponível apenas em Luanda). O método escolhido fica visível antes de confirmares a compra.',
          ],
        },
        {
          heading: 'Quando é cobrado o pagamento',
          body: [
            'Para compras diretas, o pagamento é cobrado no momento da confirmação da encomenda. Para trade-in e vendas à empresa, o pagamento é feito após a inspeção técnica confirmar o valor estimado.',
          ],
        },
        {
          heading: 'Segurança nos pagamentos',
          body: [
            'Todas as transações são processadas através de parceiros de pagamento certificados, com dados encriptados de ponta a ponta. A iphonesAO nunca guarda os dados completos do teu cartão.',
          ],
        },
      ]}
    />
  );
}
