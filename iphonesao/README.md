# 📱 iphonesAO

E-commerce moderno de iPhones em Angola, construído com Next.js 15, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Linting**: ESLint
- **Formatação**: Prettier

## 📁 Estrutura do Projeto

```
iphonesao/
├── public/                    # Arquivos estáticos
│   ├── images/               # Imagens do site
│   ├── icons/                # Ícones
│   └── fonts/                # Fontes customizadas
│
├── src/
│   ├── app/                  # App Router (páginas e rotas)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ...
│   │
│   ├── components/           # Componentes React
│   │   ├── ui/              # Componentes UI reutilizáveis
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── input/
│   │   │   ├── modal/
│   │   │   ├── dropdown/
│   │   │   ├── badge/
│   │   │   ├── loader/
│   │   │   └── toast/
│   │   │
│   │   ├── features/        # Componentes específicos de funcionalidades
│   │   │   ├── products/    # Listagem, detalhes, filtros
│   │   │   ├── cart/        # Carrinho de compras
│   │   │   ├── checkout/    # Processo de checkout
│   │   │   ├── auth/        # Login, registro
│   │   │   ├── orders/      # Pedidos do usuário
│   │   │   ├── wishlist/    # Lista de desejos
│   │   │   └── reviews/     # Avaliações de produtos
│   │   │
│   │   ├── layouts/         # Layouts principais
│   │   │   ├── header/      # Cabeçalho
│   │   │   ├── footer/      # Rodapé
│   │   │   └── sidebar/     # Barra lateral
│   │   │
│   │   └── common/          # Componentes comuns
│   │
│   ├── lib/                 # Bibliotecas e utilitários
│   │   ├── api/            # Chamadas à API
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── users/
│   │   │   └── cart/
│   │   │
│   │   ├── services/       # Serviços de negócio
│   │   │   ├── payment/    # Integração de pagamento
│   │   │   ├── shipping/   # Cálculo de frete
│   │   │   ├── notification/ # Notificações
│   │   │   └── analytics/  # Analytics
│   │   │
│   │   ├── hooks/          # React Hooks customizados
│   │   ├── utils/          # Funções utilitárias
│   │   └── validations/    # Validações de formulários
│   │
│   ├── types/              # Definições TypeScript
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   ├── user.ts
│   │   ├── order.ts
│   │   └── index.ts
│   │
│   ├── config/             # Configurações
│   │   └── site.ts         # Configurações do site
│   │
│   ├── constants/          # Constantes da aplicação
│   │   └── index.ts
│   │
│   └── styles/             # Estilos globais
│
├── .env.local.example      # Exemplo de variáveis de ambiente
├── .prettierrc             # Configuração do Prettier
├── eslint.config.mjs       # Configuração do ESLint
├── tailwind.config.ts      # Configuração do Tailwind
├── tsconfig.json           # Configuração do TypeScript
└── package.json
```

## 🎯 Funcionalidades Planejadas

### 🛍️ E-commerce Core
- ✅ Estrutura de tipos TypeScript
- 🔄 Catálogo de produtos com filtros avançados
- 🔄 Carrinho de compras
- 🔄 Processo de checkout
- 🔄 Sistema de pagamento
- 🔄 Rastreamento de pedidos

### 👤 Usuário
- 🔄 Autenticação (Login/Registro)
- 🔄 Perfil do usuário
- 🔄 Histórico de pedidos
- 🔄 Lista de desejos
- 🔄 Gerenciamento de endereços

### 🎨 Interface
- ✅ Design system com Tailwind CSS
- 🔄 Componentes UI reutilizáveis
- 🔄 Responsivo (Mobile-first)
- 🔄 Dark mode (opcional)
- 🔄 Animações suaves

### 🔧 Recursos Técnicos
- ✅ TypeScript strict mode
- ✅ Code formatting com Prettier
- ✅ Linting com ESLint
- 🔄 API Routes
- 🔄 Server Actions
- 🔄 Validações de formulário
- 🔄 Gestão de estado
- 🔄 SEO otimizado

## 🏁 Começando

### Pré-requisitos

- Node.js 18+
- npm, yarn, ou pnpm

### Instalação

1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd iphonesao
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.local.example .env.local
# Edite .env.local com suas configurações
```

4. Execute o servidor de desenvolvimento
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📜 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia o servidor de produção
npm run lint         # Executa o linter
npm run format       # Formata o código com Prettier
```

## 🎨 Padrões de Código

### Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: `ProductCard.tsx`)
- **Funções/variáveis**: camelCase (ex: `formatPrice`)
- **Tipos/Interfaces**: PascalCase (ex: `Product`, `CartItem`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `API_URL`)
- **Arquivos de página**: kebab-case (ex: `product-details/page.tsx`)

### Estrutura de Componentes

```typescript
// 1. Imports
import { useState } from 'react';
import { cn } from '@/lib/utils';

// 2. Types
interface ComponentProps {
  title: string;
}

// 3. Component
export function Component({ title }: ComponentProps) {
  // hooks
  const [state, setState] = useState();

  // handlers
  const handleClick = () => {};

  // render
  return <div>{title}</div>;
}
```

### Organização de Imports

```typescript
// 1. React/Next
import { useState } from 'react';
import Link from 'next/link';

// 2. Bibliotecas externas
import { clsx } from 'clsx';

// 3. Imports internos - aliases
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

// 4. Imports relativos
import { LocalComponent } from './LocalComponent';
```

## 🌍 Localização

O projeto está configurado para o mercado angolano:
- **Moeda**: Kwanza Angolano (AOA)
- **Idioma**: Português (pt-AO)
- **Províncias**: Todas as províncias de Angola

## 🔐 Segurança

- Nunca commite arquivos `.env.local`
- Use variáveis de ambiente para dados sensíveis
- Valide todas as entradas do usuário
- Sanitize dados antes de exibir

## 📝 Próximos Passos

1. Implementar componentes UI básicos (Button, Card, Input, etc.)
2. Criar páginas principais (Home, Produtos, Produto Individual)
3. Implementar carrinho de compras
4. Configurar API routes
5. Integrar sistema de pagamento
6. Adicionar autenticação
7. Implementar painel administrativo

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Contato

- Email: contato@iphonesao.com
- WhatsApp: +244 900 000 000

---

Desenvolvido com ❤️ em Angola 🇦🇴
