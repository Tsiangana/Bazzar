import type { Metadata } from 'next';

import { SimplePageLayout } from '@/components/features/SimplePageLayout';

export const metadata: Metadata = {
  title: 'Guias',
  description: 'Guias para te ajudarem a escolher, cuidar e negociar o teu iPhone.',
};

export default function GuiasPage() {
  return (
    <SimplePageLayout
      title="Guias"
      intro="Recursos para te ajudarem a tirar o máximo partido da iphonesAO."
      sections={[
        {
          heading: 'Como escolher o iPhone certo',
          body: [
            'Considera o que mais usas no teu dia a dia: capacidade de armazenamento, qualidade da câmara, autonomia da bateria e orçamento disponível. Os modelos "Pro" oferecem câmaras mais avançadas; os modelos "standard" e "SE" são mais acessíveis sem abdicar da qualidade iphonesAO.',
          ],
        },
        {
          heading: 'Saúde da bateria: o que significa',
          body: [
            'A percentagem de saúde da bateria indica a capacidade atual face à capacidade original de fábrica. Todos os equipamentos remodelados vendidos na iphonesAO têm bateria com saúde igual ou superior a 85%, verificada na inspeção técnica.',
          ],
        },
        {
          heading: 'Como preparar o teu iPhone para trade-in ou venda',
          body: [
            'Antes de enviares o teu equipamento, faz uma cópia de segurança dos teus dados, termina sessão na tua conta Apple e remove o Face ID/Touch ID, e retira capas, películas ou cartões SIM. Isto acelera a inspeção e a avaliação.',
          ],
        },
      ]}
    />
  );
}
