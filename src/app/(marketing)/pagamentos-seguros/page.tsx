import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';

export const metadata: Metadata = {
  title: 'Pagamentos 100% seguros',
  description: 'As medidas de segurança que protegem cada pagamento na iphonesAO.',
};

export default function PagamentosSegurosPage() {
  return (
    <SimplePageLayout
      title="Pagamentos 100% seguros"
      intro="Cada transação na iphonesAO passa por várias camadas de segurança."
      sections={[
        {
          heading: 'Encriptação de ponta a ponta',
          body: [
            'Todos os dados de pagamento são transmitidos através de ligações encriptadas, garantindo que a informação nunca circula em texto simples.',
          ],
        },
        {
          heading: 'Parceiros de pagamento certificados',
          body: [
            'Trabalhamos apenas com processadores de pagamento certificados e conformes com os padrões de segurança da indústria (PCI DSS).',
          ],
        },
        {
          heading: 'Suspeita de fraude',
          body: [
            'Se identificares alguma atividade suspeita relacionada com um pagamento feito na iphonesAO, contacta imediatamente o nosso Centro de Ajuda.',
          ],
        },
      ]}
    />
  );
}
