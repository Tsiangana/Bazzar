import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a iphonesAO recolhe, utiliza e protege os teus dados pessoais.',
};

export default function PrivacidadePage() {
  return (
    <SimplePageLayout
      title="Política de Privacidade"
      intro="A tua privacidade é importante para nós. Esta política explica que dados recolhemos e como os utilizamos."
      sections={[
        {
          heading: 'Dados que recolhemos',
          body: [
            'Recolhemos dados como nome, contacto, morada de entrega e histórico de compras, necessários para processar encomendas, avaliações de trade-in e vendas à empresa.',
          ],
        },
        {
          heading: 'Finalidade do tratamento',
          body: [
            'Utilizamos os teus dados para processar encomendas, gerir a tua conta, prestar apoio ao cliente e, com o teu consentimento, enviar comunicações sobre novidades e ofertas.',
          ],
        },
        {
          heading: 'Partilha de dados',
          body: [
            'Partilhamos dados apenas com parceiros essenciais ao serviço, como processadores de pagamento e transportadoras, nunca vendendo os teus dados a terceiros.',
          ],
        },
        {
          heading: 'Os teus direitos',
          body: [
            'Podes solicitar acesso, correção ou eliminação dos teus dados pessoais a qualquer momento, através do nosso Centro de Ajuda.',
          ],
        },
        {
          heading: 'Alterações a esta política',
          body: [
            `Podemos atualizar esta política periodicamente. Para questões sobre privacidade, contacta-nos em ${siteConfig.contact.email}.`,
          ],
        },
      ]}
    />
  );
}
