# 📋 Referência Rápida - iphonesAO

## 🎨 Cores e Estilos Tailwind

### Cores Comuns no Projeto
```tsx
// Primária (Azul)
bg-blue-600 text-white hover:bg-blue-700

// Secundária (Cinza)
bg-gray-200 text-gray-900 hover:bg-gray-300

// Sucesso (Verde)
bg-green-600 text-white

// Erro (Vermelho)
bg-red-600 text-white

// Aviso (Amarelo)
bg-yellow-500 text-white
```

### Shadows e Borders
```tsx
// Shadow suave
shadow-sm

// Shadow média
shadow-md

// Shadow grande
shadow-lg

// Border
border border-gray-200

// Border com radius
rounded-lg border
```

## 🧩 Snippets de Código Úteis

### Componente Básico
```tsx
// src/components/ui/component/Component.tsx
import { cn } from '@/lib/utils';

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
}

export function Component({ children, className }: ComponentProps) {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  );
}
```

### Client Component com Estado
```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Cliques: {count}
    </button>
  );
}
```

### Server Component com Fetch
```tsx
// Server Component (padrão)
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <div>{data.title}</div>;
}
```

### Página com Loading e Error
```tsx
// page.tsx
export default function Page() {
  return <div>Conteúdo</div>;
}

// loading.tsx
export default function Loading() {
  return <div>Carregando...</div>;
}

// error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <p>Erro: {error.message}</p>
      <button onClick={reset}>Tentar novamente</button>
    </div>
  );
}
```

### API Route
```tsx
// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const products = []; // buscar produtos

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const body = await request.json();

  // processar dados

  return NextResponse.json({ success: true });
}
```

### Custom Hook
```tsx
// lib/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## 🔧 Utilitários Criados

### Formatação
```tsx
import { formatPrice, formatDate, formatPhone } from '@/lib/utils';

formatPrice(50000);           // "50.000,00 Kz"
formatDate(new Date());       // "9 de julho de 2026"
formatPhone('923456789');     // "923 456 789"
```

### Merge de Classes
```tsx
import { cn } from '@/lib/utils';

cn('text-base', 'font-bold');                    // "text-base font-bold"
cn('text-red-500', condition && 'text-blue-500'); // Condicional
```

## 📝 Tipos Comuns

### Product
```tsx
import type { Product } from '@/types';

const product: Product = {
  id: '1',
  name: 'iPhone 15 Pro',
  price: 1500000,
  // ... outros campos
};
```

### Cart
```tsx
import type { Cart, CartItem } from '@/types';

const cart: Cart = {
  id: '1',
  items: [],
  total: 0,
  // ... outros campos
};
```

## 🎯 Constantes Disponíveis

```tsx
import {
  PRODUCT_CATEGORIES,
  STORAGE_OPTIONS,
  COLOR_OPTIONS,
  PROVINCES_ANGOLA,
  ORDER_STATUS_LABELS,
} from '@/constants';

// Usar em selects, filtros, etc.
PRODUCT_CATEGORIES.map(cat => <option key={cat}>{cat}</option>);
```

## 🌐 Configuração do Site

```tsx
import { siteConfig, navItems } from '@/config/site';

// Informações do site
siteConfig.name;           // "iphonesAO"
siteConfig.contact.phone;  // "+244 900 000 000"

// Navegação
navItems.map(item => (
  <Link key={item.href} href={item.href}>
    {item.title}
  </Link>
));
```

## 📱 Responsive Design

### Breakpoints Tailwind
```tsx
// Mobile first
<div className="text-sm md:text-base lg:text-lg">
  // sm:  640px
  // md:  768px
  // lg:  1024px
  // xl:  1280px
  // 2xl: 1536px
</div>
```

### Grid Responsivo
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards de produtos */}
</div>
```

## 🔍 Validação com Zod (Exemplo)

```tsx
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  price: z.number().positive('Preço deve ser positivo'),
  email: z.string().email('Email inválido'),
});

// Validar
const result = productSchema.safeParse(data);
if (!result.success) {
  console.log(result.error.errors);
}
```

## 🎨 Layout Patterns

### Container
```tsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* Conteúdo centralizado */}
</div>
```

### Flexbox
```tsx
// Centralizar vertical e horizontal
<div className="flex items-center justify-center h-screen">
  <div>Centralizado</div>
</div>

// Espaço entre elementos
<div className="flex justify-between items-center">
  <div>Esquerda</div>
  <div>Direita</div>
</div>
```

### Grid
```tsx
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-8">Principal</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>
```

## 🚀 Performance Tips

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/images/product.jpg"
  alt="Produto"
  width={500}
  height={500}
  priority // Para imagens above the fold
/>
```

### Dynamic Import
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Carregando...</p>,
  ssr: false, // Desabilitar SSR se necessário
});
```

### Metadata (SEO)
```tsx
// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iphonesAO - iPhones em Angola',
  description: 'Sua loja online de iPhones',
};
```

## 📦 Gerenciamento de Estado (Exemplo Zustand)

```tsx
// lib/store/useStore.ts
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Usar no componente
'use client';
import { useStore } from '@/lib/store/useStore';

export function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}
```

## 🔐 Environment Variables

```tsx
// Acessar variáveis de ambiente
process.env.NEXT_PUBLIC_API_URL  // Cliente e servidor
process.env.DATABASE_URL          // Apenas servidor
```

## ⚡ Atalhos de Desenvolvimento

```bash
# Criar componente rapidamente
mkdir -p src/components/ui/novo
touch src/components/ui/novo/{Novo.tsx,index.ts}

# Buscar em arquivos
grep -r "searchTerm" src/

# Contar linhas de código
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l
```

---

Esta referência deve ser atualizada conforme novos padrões são estabelecidos.
