import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';

export const metadata: Metadata = {
  title: 'Envio',
  description: 'Prazos e áreas de entrega da iphonesAO em Angola.',
};

export default function EnvioPage() {
  return (
    <SimplePageLayout
      title="Envio"
      intro="Entregamos em todo o território nacional, com prazos que variam consoante a localização."
      sections={[
        {
          heading: 'Áreas de entrega',
          body: [
            'Entregamos em Luanda e nas restantes províncias de Angola através dos nossos parceiros de transporte.',
          ],
        },
        {
          heading: 'Prazos de entrega',
          body: [
            'Luanda: 24 a 48 horas úteis após a confirmação da encomenda.',
            'Outras províncias: 3 a 5 dias úteis, dependendo da localidade.',
          ],
        },
        {
          heading: 'Acompanhar a encomenda',
          body: [
            'Assim que a encomenda é despachada, recebes um código de acompanhamento por e-mail para veres o estado da entrega em tempo real.',
          ],
        },
      ]}
    />
  );
}
