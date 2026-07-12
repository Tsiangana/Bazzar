import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';

export const metadata: Metadata = {
  title: 'Garantia iphonesAO',
  description: 'Como funciona a garantia de 12 meses em todos os equipamentos remodelados.',
};

export default function GarantiaPage() {
  return (
    <SimplePageLayout
      title="Garantia iphonesAO"
      intro="Todos os iPhones remodelados vendidos na iphonesAO incluem 12 meses de garantia."
      sections={[
        {
          heading: 'O que está coberto',
          body: [
            'A garantia cobre defeitos de funcionamento relacionados com bateria, ecrã, câmara, botões e demais componentes internos, desde que não resultem de mau uso, queda ou contacto com líquidos.',
          ],
        },
        {
          heading: 'Como acionar a garantia',
          body: [
            'Contacta o nosso Centro de Ajuda com o número da encomenda e a descrição do problema. A nossa equipa técnica avalia o equipamento e, se aplicável, procede à reparação ou substituição sem custos adicionais.',
          ],
        },
        {
          heading: 'O que não está coberto',
          body: [
            'Danos causados por queda, água, alterações não autorizadas ao equipamento, ou desgaste natural de componentes como a bateria após o período de garantia.',
          ],
        },
      ]}
    />
  );
}
