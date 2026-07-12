import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Menções Legais',
  description: 'Identificação da empresa responsável pela plataforma iphonesAO.',
};

export default function MencoesLegaisPage() {
  return (
    <SimplePageLayout
      title="Menções Legais"
      sections={[
        {
          heading: 'Identificação da empresa',
          body: [
            `${siteConfig.name} é uma plataforma dedicada à compra, venda, trade-in e leilões de iPhones em Angola. Para questões legais, contacta-nos em ${siteConfig.contact.email} ou ${siteConfig.contact.phone}.`,
          ],
        },
        {
          heading: 'Propriedade do conteúdo',
          body: [
            'A marca, o design e todo o conteúdo original apresentados nesta plataforma pertencem à iphonesAO, salvo indicação em contrário.',
          ],
        },
        {
          heading: 'Isenção de responsabilidade',
          body: [
            'Fazemos todos os esforços para manter a informação da plataforma atualizada e precisa, mas não garantimos a ausência total de erros ou omissões.',
          ],
        },
      ]}
    />
  );
}
