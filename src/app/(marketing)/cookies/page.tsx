import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';

export const metadata: Metadata = {
  title: 'Cookies e Definições de privacidade',
  description: 'Como a iphonesAO utiliza cookies e como podes gerir as tuas preferências.',
};

export default function CookiesPage() {
  return (
    <SimplePageLayout
      title="Cookies e Definições de privacidade"
      intro="Utilizamos cookies para melhorar a tua experiência na plataforma."
      sections={[
        {
          heading: 'Cookies essenciais',
          body: [
            'Necessários para o funcionamento da plataforma, como manter a tua sessão iniciada e o conteúdo do carrinho. Não podem ser desativados.',
          ],
        },
        {
          heading: 'Cookies de desempenho',
          body: [
            'Ajudam-nos a perceber como utilizas a plataforma, para podermos melhorar a navegação e corrigir eventuais problemas.',
          ],
        },
        {
          heading: 'Cookies de marketing',
          body: [
            'Utilizados para mostrar comunicações e ofertas mais relevantes para ti, com base no teu interesse em determinados modelos ou serviços.',
          ],
        },
        {
          heading: 'Como gerir as tuas preferências',
          body: [
            'Podes ajustar ou desativar cookies não essenciais nas definições do teu navegador a qualquer momento.',
          ],
        },
      ]}
    />
  );
}
