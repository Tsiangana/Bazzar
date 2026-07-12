import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';

export const metadata: Metadata = {
  title: 'Devoluções e reembolsos',
  description: 'Política de devolução de 30 dias e como pedir um reembolso na iphonesAO.',
};

export default function DevolucoesPage() {
  return (
    <SimplePageLayout
      title="Devoluções e reembolsos"
      intro="Tens 30 dias para mudares de ideias em qualquer compra feita na iphonesAO."
      sections={[
        {
          heading: 'Política de devolução',
          body: [
            'Se não ficares satisfeito com o teu iPhone, podes devolvê-lo no prazo de 30 dias a contar da data de entrega, desde que o equipamento esteja nas condições em que foi recebido.',
          ],
        },
        {
          heading: 'Como pedir uma devolução',
          body: [
            'Contacta o nosso apoio ao cliente com o número da encomenda, confirma o motivo da devolução e envia o equipamento seguindo as instruções fornecidas por e-mail.',
          ],
        },
        {
          heading: 'Reembolsos',
          body: [
            'Depois de recebermos e inspecionarmos o equipamento devolvido, o reembolso é processado no prazo de até 7 dias úteis, através do mesmo método de pagamento utilizado na compra.',
          ],
        },
      ]}
    />
  );
}
