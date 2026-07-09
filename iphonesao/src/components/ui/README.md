# Componentes UI

Esta pasta contém componentes de interface reutilizáveis que formam o design system do projeto.

## Características

- **Genéricos**: Não contêm lógica de negócio específica
- **Reutilizáveis**: Podem ser usados em qualquer parte do projeto
- **Customizáveis**: Aceitam props para variações de estilo
- **Acessíveis**: Seguem padrões de acessibilidade (WCAG)

## Componentes Disponíveis

- `button/` - Botões com variantes (primary, secondary, outline, etc.)
- `card/` - Cards para exibição de conteúdo
- `input/` - Inputs de formulário (text, email, password, etc.)
- `modal/` - Modais e diálogos
- `dropdown/` - Menus dropdown
- `badge/` - Badges e tags
- `loader/` - Indicadores de carregamento
- `toast/` - Notificações toast

## Como Usar

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function Example() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```
