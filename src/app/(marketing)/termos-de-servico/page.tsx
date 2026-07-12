import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Termos de serviço',
  description: 'Termos que regem a utilização da plataforma iphonesAO.',
};

export default function TermosServicoPage() {
  return (
    <SimplePageLayout
      title="Termos de serviço"
      intro="Ao utilizares a iphonesAO, aceitas os termos descritos abaixo."
      sections={[
        {
          heading: 'Aceitação dos termos',
          body: [
            'Ao aceder ou utilizar a plataforma iphonesAO, concordas em cumprir estes termos de serviço e todas as leis e regulamentos aplicáveis em Angola.',
          ],
        },
        {
          heading: 'Conta de utilizador',
          body: [
            'És responsável por manter a confidencialidade dos dados da tua conta e por todas as atividades realizadas através dela. Notifica-nos imediatamente em caso de uso não autorizado.',
          ],
        },
        {
          heading: 'Uso da plataforma',
          body: [
            'A plataforma destina-se à compra, venda, trade-in e participação em leilões de iPhones. É proibido utilizar a iphonesAO para fins fraudulentos, ilegais ou que violem direitos de terceiros.',
          ],
        },
        {
          heading: 'Propriedade intelectual',
          body: [
            'Todo o conteúdo da plataforma — incluindo texto, imagens, marca e design — é propriedade da iphonesAO ou dos seus licenciadores, não podendo ser reproduzido sem autorização.',
          ],
        },
        {
          heading: 'Limitação de responsabilidade',
          body: [
            'A iphonesAO não se responsabiliza por danos indiretos resultantes do uso da plataforma, dentro dos limites permitidos pela lei angolana.',
          ],
        },
        {
          heading: 'Alterações aos termos',
          body: [
            'Podemos atualizar estes termos periodicamente. Alterações relevantes serão comunicadas através da plataforma ou por e-mail.',
          ],
        },
        {
          heading: 'Lei aplicável',
          body: [
            `Estes termos são regidos pela lei angolana. Para qualquer questão, contacta-nos em ${siteConfig.contact.email}.`,
          ],
        },
      ]}
    />
  );
}
