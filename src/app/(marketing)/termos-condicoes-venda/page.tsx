import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';

export const metadata: Metadata = {
  title: 'Termos e condições gerais de venda',
  description: 'Condições que regem a compra de equipamentos na iphonesAO.',
};

export default function TermosCondicoesVendaPage() {
  return (
    <SimplePageLayout
      title="Termos e condições gerais de venda"
      sections={[
        {
          heading: 'Formação do contrato',
          body: [
            'A compra fica concluída quando confirmas a encomenda e o pagamento é processado com sucesso. Recebes uma confirmação por e-mail com os detalhes da tua compra.',
          ],
        },
        {
          heading: 'Preços e disponibilidade',
          body: [
            'Os preços apresentados incluem todos os impostos aplicáveis e estão sujeitos a alteração sem aviso prévio. A disponibilidade de stock é validada apenas no momento da confirmação da encomenda.',
          ],
        },
        {
          heading: 'Pagamento',
          body: [
            'O pagamento é processado através de um dos métodos disponíveis na plataforma. Consulta a nossa página de Pagamento para mais detalhes.',
          ],
        },
        {
          heading: 'Entrega',
          body: [
            'Os prazos de entrega variam consoante a localização. Consulta a nossa página de Envio para mais informações.',
          ],
        },
        {
          heading: 'Direito de devolução',
          body: [
            'Tens 30 dias após a receção para devolver o equipamento, de acordo com a nossa política de Devoluções e reembolsos.',
          ],
        },
        {
          heading: 'Garantias',
          body: [
            'Todos os equipamentos remodelados incluem 12 meses de garantia iphonesAO, cobrindo defeitos de funcionamento não resultantes de mau uso.',
          ],
        },
      ]}
    />
  );
}
