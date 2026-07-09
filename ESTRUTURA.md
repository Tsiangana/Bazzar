# 📂 Guia de Estrutura de Pastas - iphonesAO

Este documento detalha a organização de pastas e arquivos do projeto, explicando o propósito de cada diretório e como utilizá-los.

## 🗂️ Visão Geral da Estrutura

```
iphonesao/
├── public/              → Arquivos públicos estáticos
├── src/                 → Código-fonte da aplicação
│   ├── app/            → Rotas e páginas (App Router)
│   ├── components/     → Componentes React
│   ├── lib/            → Bibliotecas e lógica de negócio
│   ├── types/          → Tipos TypeScript
│   ├── config/         → Configurações
│   ├── constants/      → Constantes
│   └── styles/         → Estilos globais
└── [arquivos config]   → Configurações do projeto
```

---

## 📁 Detalhamento de Diretórios

### 🌐 `/public`
Arquivos servidos estaticamente pelo Next.js.

```
public/
├── images/          → Imagens (produtos, banners, etc.)
├── icons/           → Ícones e favicons
└── fonts/           → Fontes customizadas
```

**Quando usar:**
- Imagens que não precisam de otimização do Next.js
- Favicons e manifests
- Assets que precisam de URL pública estática

**Exemplo:**
```tsx
<img src="/images/logo.png" alt="Logo" />
```

---

### 📱 `/src/app`
Rotas e páginas usando o App Router do Next.js 15.

```
app/
├── layout.tsx              → Layout global
├── page.tsx                → Página inicial (/)
├── loading.tsx             → Loading state global
├── error.tsx               → Error boundary global
├── not-found.tsx           → Página 404
│
├── produtos/               → /produtos
│   ├── page.tsx           → Lista de produtos
│   ├── loading.tsx        → Loading da lista
│   └── [id]/              → /produtos/[id]
│       ├── page.tsx       → Detalhes do produto
│       └── loading.tsx    → Loading dos detalhes
│
├── carrinho/               → /carrinho
│   └── page.tsx
│
├── checkout/               → /checkout
│   └── page.tsx
│
├── conta/                  → /conta (área do usuário)
│   ├── page.tsx           → Dashboard da conta
│   ├── pedidos/           → /conta/pedidos
│   ├── perfil/            → /conta/perfil
│   └── enderecos/         → /conta/enderecos
│
└── api/                    → API Routes
    ├── products/
    ├── cart/
    ├── orders/
    └── auth/
```

**Convenções:**
- `page.tsx` - Rota pública
- `layout.tsx` - Layout compartilhado
- `loading.tsx` - UI de carregamento
- `error.tsx` - Tratamento de erros
- `[param]` - Rota dinâmica

---

### 🧩 `/src/components`
Componentes React organizados por tipo e funcionalidade.

#### 🎨 `/components/ui`
Componentes de interface reutilizáveis (Design System).

```
ui/
├── button/
│   ├── Button.tsx              → Componente
│   ├── Button.types.ts         → Tipos (opcional)
│   └── index.ts                → Export
│
├── card/
│   ├── Card.tsx
│   ├── CardHeader.tsx
│   ├── CardBody.tsx
│   ├── CardFooter.tsx
│   └── index.ts
│
├── input/
│   ├── Input.tsx
│   ├── TextArea.tsx
│   └── index.ts
│
├── modal/
│   ├── Modal.tsx
│   ├── ModalContent.tsx
│   └── index.ts
│
└── [outros componentes UI...]
```

**Características:**
- Componentes genéricos e reutilizáveis
- Sem lógica de negócio
- Altamente customizáveis via props
- Estilizados com Tailwind CSS

**Exemplo de uso:**
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="lg">
  Adicionar ao Carrinho
</Button>
```

#### ⚙️ `/components/features`
Componentes específicos de funcionalidades.

```
features/
├── products/
│   ├── ProductCard.tsx          → Card de produto
│   ├── ProductList.tsx          → Lista de produtos
│   ├── ProductFilters.tsx       → Filtros de pesquisa
│   ├── ProductSort.tsx          → Ordenação
│   └── ProductDetails.tsx       → Detalhes do produto
│
├── cart/
│   ├── CartItem.tsx            → Item no carrinho
│   ├── CartSummary.tsx         → Resumo do carrinho
│   ├── CartDrawer.tsx          → Drawer do carrinho
│   └── EmptyCart.tsx           → Estado vazio
│
├── checkout/
│   ├── CheckoutForm.tsx        → Formulário de checkout
│   ├── ShippingForm.tsx        → Form de envio
│   ├── PaymentForm.tsx         → Form de pagamento
│   └── OrderSummary.tsx        → Resumo do pedido
│
├── auth/
│   ├── LoginForm.tsx           → Formulário de login
│   ├── RegisterForm.tsx        → Formulário de registro
│   └── ForgotPassword.tsx      → Recuperar senha
│
├── orders/
│   ├── OrderCard.tsx           → Card de pedido
│   ├── OrderList.tsx           → Lista de pedidos
│   └── OrderDetails.tsx        → Detalhes do pedido
│
├── wishlist/
│   ├── WishlistButton.tsx      → Botão adicionar/remover
│   └── WishlistGrid.tsx        → Grid de produtos
│
└── reviews/
    ├── ReviewCard.tsx          → Card de avaliação
    ├── ReviewForm.tsx          → Form de avaliação
    └── ReviewList.tsx          → Lista de avaliações
```

**Características:**
- Componentes com lógica de negócio
- Específicos para funcionalidades
- Podem usar componentes UI

#### 🏗️ `/components/layouts`
Componentes de layout principal.

```
layouts/
├── header/
│   ├── Header.tsx              → Cabeçalho principal
│   ├── Navigation.tsx          → Menu de navegação
│   ├── SearchBar.tsx           → Barra de pesquisa
│   ├── UserMenu.tsx            → Menu do usuário
│   └── CartButton.tsx          → Botão do carrinho
│
├── footer/
│   ├── Footer.tsx              → Rodapé
│   ├── FooterLinks.tsx         → Links do rodapé
│   └── Newsletter.tsx          → Newsletter signup
│
└── sidebar/
    ├── Sidebar.tsx             → Barra lateral
    ├── FilterSidebar.tsx       → Filtros (mobile)
    └── CategoryMenu.tsx        → Menu de categorias
```

#### 🔄 `/components/common`
Componentes comuns usados em várias partes.

```
common/
├── LoadingSpinner.tsx          → Spinner de carregamento
├── ErrorMessage.tsx            → Mensagem de erro
├── EmptyState.tsx              → Estado vazio genérico
├── Breadcrumb.tsx              → Breadcrumb de navegação
└── Pagination.tsx              → Paginação
```

---

### 📚 `/src/lib`
Bibliotecas, utilitários e lógica de negócio.

#### 🌐 `/lib/api`
Funções para chamadas à API.

```
api/
├── products/
│   ├── getProducts.ts          → Buscar produtos
│   ├── getProductById.ts       → Buscar produto por ID
│   ├── searchProducts.ts       → Pesquisar produtos
│   └── index.ts
│
├── cart/
│   ├── addToCart.ts            → Adicionar ao carrinho
│   ├── updateCart.ts           → Atualizar carrinho
│   ├── removeFromCart.ts       → Remover do carrinho
│   └── index.ts
│
├── orders/
│   ├── createOrder.ts          → Criar pedido
│   ├── getOrders.ts            → Buscar pedidos
│   ├── getOrderById.ts         → Buscar pedido por ID
│   └── index.ts
│
└── users/
    ├── login.ts                → Login
    ├── register.ts             → Registro
    ├── getProfile.ts           → Buscar perfil
    └── index.ts
```

**Padrão de implementação:**
```typescript
// api/products/getProducts.ts
import type { Product, ProductFilter } from '@/types';

export async function getProducts(
  filters?: ProductFilter
): Promise<Product[]> {
  const response = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(filters),
  });

  if (!response.ok) throw new Error('Failed to fetch products');

  return response.json();
}
```

#### 🛠️ `/lib/services`
Serviços de negócio e integrações.

```
services/
├── payment/
│   ├── stripe.ts               → Integração Stripe
│   ├── paypal.ts               → Integração PayPal
│   └── index.ts
│
├── shipping/
│   ├── calculateShipping.ts    → Calcular frete
│   ├── trackOrder.ts           → Rastrear pedido
│   └── index.ts
│
├── notification/
│   ├── email.ts                → Envio de emails
│   ├── sms.ts                  → Envio de SMS
│   └── index.ts
│
└── analytics/
    ├── track.ts                → Track de eventos
    └── index.ts
```

#### 🪝 `/lib/hooks`
Custom React Hooks.

```
hooks/
├── useCart.ts                  → Hook do carrinho
├── useAuth.ts                  → Hook de autenticação
├── useProducts.ts              → Hook de produtos
├── useDebounce.ts              → Hook de debounce
├── useLocalStorage.ts          → Hook de localStorage
└── index.ts
```

**Exemplo:**
```typescript
// hooks/useCart.ts
import { create } from 'zustand';
import type { Cart, CartItem } from '@/types';

interface CartStore {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  cart: { items: [], total: 0 },
  addItem: (item) => set((state) => ({
    cart: { ...state.cart, items: [...state.cart.items, item] }
  })),
  // ... outros métodos
}));
```

#### 🔧 `/lib/utils`
Funções utilitárias.

```
utils/
├── cn.ts                       → Merge de classes CSS
├── format.ts                   → Formatação (preço, data, etc)
└── index.ts
```

#### ✅ `/lib/validations`
Schemas de validação.

```
validations/
├── product.ts                  → Validação de produtos
├── checkout.ts                 → Validação de checkout
├── auth.ts                     → Validação de autenticação
└── index.ts
```

**Exemplo com Zod:**
```typescript
// validations/checkout.ts
import { z } from 'zod';

export const checkoutSchema = z.object({
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone inválido'),
  address: z.object({
    street: z.string().min(1, 'Rua obrigatória'),
    city: z.string().min(1, 'Cidade obrigatória'),
    province: z.string().min(1, 'Província obrigatória'),
  }),
});
```

---

### 📝 `/src/types`
Definições de tipos TypeScript.

```
types/
├── product.ts                  → Tipos de produtos
├── cart.ts                     → Tipos de carrinho
├── user.ts                     → Tipos de usuário
├── order.ts                    → Tipos de pedidos
└── index.ts                    → Exports centralizados
```

**Organização:**
- Um arquivo por domínio
- Interfaces para objetos
- Types para unions/helpers
- Export centralizado no index.ts

---

### ⚙️ `/src/config`
Configurações da aplicação.

```
config/
├── site.ts                     → Config do site (meta, nav, etc)
└── api.ts                      → Config da API (opcional)
```

---

### 📌 `/src/constants`
Constantes da aplicação.

```
constants/
└── index.ts                    → Todas as constantes
```

**Conteúdo:**
- Categorias de produtos
- Opções de storage
- Cores disponíveis
- Status de pedidos
- Métodos de pagamento
- Províncias de Angola

---

## 🎯 Boas Práticas

### 1. Nomenclatura de Arquivos
- **Componentes**: `PascalCase.tsx` (ex: `ProductCard.tsx`)
- **Utilitários**: `camelCase.ts` (ex: `formatPrice.ts`)
- **Páginas**: `kebab-case` para pastas (ex: `product-details/`)
- **Tipos**: `camelCase.ts` (ex: `product.ts`)

### 2. Estrutura de Pastas
- Agrupe por funcionalidade, não por tipo de arquivo
- Mantenha componentes relacionados juntos
- Use `index.ts` para exports limpos

### 3. Imports
- Use path aliases (`@/`)
- Organize imports por categoria
- Export/import pelo index quando possível

### 4. Organização de Código
```typescript
// Ordem recomendada dentro de um arquivo
1. Imports
2. Types/Interfaces
3. Constants
4. Component/Function
5. Exports
```

---

## 📖 Exemplos de Uso

### Criar novo componente UI
```bash
# 1. Criar pasta do componente
mkdir src/components/ui/badge

# 2. Criar arquivos
touch src/components/ui/badge/Badge.tsx
touch src/components/ui/badge/index.ts

# 3. Implementar e exportar
```

### Criar nova feature
```bash
# 1. Criar pasta da feature
mkdir src/components/features/promotions

# 2. Criar componentes relacionados
touch src/components/features/promotions/PromotionCard.tsx
touch src/components/features/promotions/PromotionBanner.tsx
touch src/components/features/promotions/PromotionGrid.tsx
touch src/components/features/promotions/index.ts
```

### Adicionar nova página
```bash
# 1. Criar rota
mkdir src/app/sobre

# 2. Criar arquivos da página
touch src/app/sobre/page.tsx
touch src/app/sobre/loading.tsx
```

---

## 🔍 Referência Rápida

| Preciso de... | Onde colocar |
|--------------|--------------|
| Componente reutilizável | `/components/ui/` |
| Componente de funcionalidade | `/components/features/` |
| Layout do site | `/components/layouts/` |
| Nova página | `/app/` |
| API route | `/app/api/` |
| Função utilitária | `/lib/utils/` |
| Custom hook | `/lib/hooks/` |
| Chamada à API | `/lib/api/` |
| Tipo TypeScript | `/types/` |
| Constante | `/constants/` |
| Imagem estática | `/public/images/` |

---

Este guia deve ser atualizado conforme o projeto evolui e novas convenções são estabelecidas.
