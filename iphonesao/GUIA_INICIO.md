# 🚀 Guia de Início Rápido - iphonesAO

## ✅ O que já está configurado

### 🎯 Projeto Base
- ✅ Next.js 15 com App Router
- ✅ TypeScript configurado (strict mode)
- ✅ Tailwind CSS instalado e configurado
- ✅ ESLint para qualidade de código
- ✅ Prettier para formatação automática

### 📁 Estrutura de Pastas
- ✅ 46+ diretórios organizados e prontos
- ✅ Estrutura modular por funcionalidade
- ✅ Separação clara: UI / Features / Layouts

### 🎨 Design System
- ✅ Função `cn()` para merge de classes Tailwind
- ✅ Utilidades de formatação (preço, data, telefone)
- ✅ Configuração do site (siteConfig)
- ✅ Constantes do projeto (categorias, cores, províncias)

### 📝 TypeScript
- ✅ Tipos completos para: Product, Cart, User, Order
- ✅ Interfaces exportadas e organizadas
- ✅ Types para API responses e paginação

### 🛠️ Utilitários
- ✅ Formatação de preços em Kwanza (AOA)
- ✅ Formatação de datas em pt-AO
- ✅ Cálculo de descontos
- ✅ Truncate de textos

### 📚 Documentação
- ✅ README.md completo
- ✅ ESTRUTURA.md detalhado (guia de pastas)
- ✅ .env.local.example com variáveis
- ✅ READMEs em pastas principais

## 🎯 Próximos Passos Recomendados

### 1. Componentes UI Básicos (Prioridade Alta)
Crie os componentes reutilizáveis primeiro:

```bash
# Começar por:
src/components/ui/button/Button.tsx
src/components/ui/card/Card.tsx
src/components/ui/input/Input.tsx
```

**Exemplo de estrutura Button:**
```tsx
// src/components/ui/button/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg font-semibold transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'border-2 border-blue-600 text-blue-600 hover:bg-blue-50': variant === 'outline',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 2. Layout Principal (Header e Footer)
```bash
src/components/layouts/header/Header.tsx
src/components/layouts/footer/Footer.tsx
```

### 3. Página Inicial
```bash
src/app/page.tsx  # Atualizar com conteúdo real
```

### 4. Páginas de Produtos
```bash
src/app/produtos/page.tsx           # Lista de produtos
src/app/produtos/[id]/page.tsx      # Detalhes do produto
```

### 5. Componentes de Produto
```bash
src/components/features/products/ProductCard.tsx
src/components/features/products/ProductList.tsx
src/components/features/products/ProductFilters.tsx
```

### 6. Carrinho de Compras
```bash
# State management (considere Zustand ou Context API)
src/lib/hooks/useCart.ts
src/components/features/cart/CartItem.tsx
src/components/features/cart/CartDrawer.tsx
```

### 7. API Routes (Backend)
```bash
src/app/api/products/route.ts
src/app/api/cart/route.ts
```

## 📦 Dependências Úteis para Instalar

### State Management
```bash
npm install zustand  # Recomendado para carrinho e estado global
```

### Formulários
```bash
npm install react-hook-form zod @hookform/resolvers
```

### Ícones
```bash
npm install lucide-react  # Biblioteca de ícones moderna
```

### Imagens
```bash
# Next.js já tem otimização de imagens built-in
# Considere Cloudinary ou similar para storage
```

### Animações
```bash
npm install framer-motion  # Animações suaves
```

### Validações
```bash
npm install zod  # Já mencionado, mas essencial
```

## 🎨 Configuração de Cores Tailwind

Adicione cores personalizadas ao `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Adicione cores específicas do projeto
      },
    },
  },
};
```

## 🗺️ Roadmap de Desenvolvimento

### Semana 1: Fundação
- [ ] Criar componentes UI básicos
- [ ] Implementar layout (Header/Footer)
- [ ] Criar página inicial
- [ ] Configurar tema de cores

### Semana 2: Produtos
- [ ] Página de listagem de produtos
- [ ] Página de detalhes do produto
- [ ] Sistema de filtros
- [ ] Busca de produtos

### Semana 3: Carrinho e Checkout
- [ ] Implementar carrinho de compras
- [ ] Criar fluxo de checkout
- [ ] Integrar cálculo de frete
- [ ] Resumo do pedido

### Semana 4: Autenticação
- [ ] Sistema de login/registro
- [ ] Perfil do usuário
- [ ] Gerenciamento de endereços
- [ ] Histórico de pedidos

### Semana 5: Pagamento e Pedidos
- [ ] Integração de pagamento
- [ ] Confirmação de pedido
- [ ] Rastreamento de pedido
- [ ] Emails transacionais

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor dev (localhost:3000)

# Build e Produção
npm run build            # Cria build otimizado
npm run start            # Inicia servidor de produção

# Qualidade de Código
npm run lint             # Verifica problemas no código
npm run format           # Formata todo o código
npm run format:check     # Verifica formatação sem alterar
npm run type-check       # Verifica erros TypeScript
```

## 💡 Dicas Importantes

### 1. Use os Path Aliases
```tsx
// ✅ Bom
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

// ❌ Evite
import { Button } from '../../components/ui/button';
```

### 2. Organize Imports
```tsx
// 1. React/Next
import { useState } from 'react';
import Link from 'next/link';

// 2. Bibliotecas externas
import { clsx } from 'clsx';

// 3. Internos
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
```

### 3. Type Safety
```tsx
// Sempre use tipos
interface Props {
  title: string;
  count: number;
}

export function Component({ title, count }: Props) {
  // ...
}
```

### 4. Server vs Client Components
```tsx
// Server Component (padrão no App Router)
export default function Page() {
  return <div>Server rendered</div>;
}

// Client Component (quando precisar de estado/eventos)
'use client';
export function Interactive() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 5. Formatação Automática
Configure seu editor para formatar ao salvar:

**VSCode (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 🐛 Troubleshooting

### Build falha
```bash
npm run type-check  # Verifica erros TypeScript primeiro
npm run lint        # Verifica problemas de lint
```

### Importação não funciona
- Verifique se o path alias `@/` está configurado em `tsconfig.json`
- Reinicie o servidor de desenvolvimento

### Tailwind não aplica estilos
- Verifique se o arquivo está em `src/` (configurado no Tailwind)
- Certifique-se de usar classes válidas do Tailwind

## 📞 Recursos

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **React**: https://react.dev

## ✨ Começar Agora

```bash
# 1. Iniciar servidor de desenvolvimento
npm run dev

# 2. Abrir navegador em http://localhost:3000

# 3. Começar a criar componentes!
# Sugestão: Comece pelo Button em src/components/ui/button/Button.tsx
```

---

Boa sorte com o desenvolvimento! 🚀🇦🇴
