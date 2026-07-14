# 📊 Painel Administrativo - iPhoneSão

Sistema de gestão administrativa completo para o projeto iPhoneSão, inspirado no design profissional e moderno do Cliro.

## ✨ Características

### 🎨 Design System

O design segue um padrão consistente e profissional:

#### Paleta de Cores
- **Primary**: `#008060` (Verde/Teal)
- **Background**: `#f7f8fa`, `#f8f9fa`
- **Borders**: `#e8e8e8`, `#f0f0f0`, `#f5f5f5`
- **Text**: Variações de cinza (`#111`, `#333`, `#666`, `#888`, `#bbb`)

#### Componentes Base
- Cards com bordas arredondadas e sombras sutis
- Badges coloridos para status
- Tabelas responsivas com hover states
- Inputs com focus states animados
- Sidebar colapsável
- Topbar com busca e notificações

### 🗂️ Estrutura de Arquivos

```
src/
├── app/admin/
│   ├── layout.tsx                    # Layout wrapper
│   ├── page.tsx                      # Dashboard principal
│   ├── pedidos/page.tsx              # Gestão de pedidos
│   ├── produtos/page.tsx             # Gestão de produtos
│   ├── categorias/page.tsx           # Gestão de categorias
│   └── clientes/page.tsx             # Gestão de clientes
│
└── components/admin/
    ├── admin-shell.tsx               # Layout shell com sidebar/topbar
    ├── admin-sidebar.tsx             # Sidebar de navegação
    └── admin-topbar.tsx              # Barra superior
```

## 📄 Páginas Implementadas

### 1. Dashboard (`/admin`)
- **KPIs**: Total de pedidos, pendentes, produtos ativos, clientes
- **Pedidos Recentes**: Tabela com últimos pedidos
- **Ações Rápidas**: Botões para criar produto, categoria e ver relatórios

### 2. Pedidos (`/admin/pedidos`)
- **Features**:
  - Cards com resumo (Total, Pendentes, Em Trânsito, Entregues)
  - Sistema de tabs por status
  - Busca por número, cliente ou localização
  - Ordenação por data (mais recentes/antigos)
  - Badges coloridos por status
  - Tabela responsiva com dados do pedido

### 3. Produtos (`/admin/produtos`)
- **Features**:
  - KPIs: Total de produtos, ativos, stock total
  - Filtros por status (Todos, Ativos, Inativos)
  - Busca por nome ou categoria
  - Visualização de stock com barra de progresso
  - Badge de status colorido
  - Ações: Editar e Eliminar

### 4. Categorias (`/admin/categorias`)
- **Features**:
  - KPIs: Total, Ativas, Produtos catalogados
  - Filtros por status
  - Busca por nome ou slug
  - Ícones personalizados por categoria
  - Contador de produtos com barra visual
  - Modal para criar categoria (placeholder)

### 5. Clientes (`/admin/clientes`)
- **Features**:
  - Métricas: Total, Ativos, Inativos, Receita
  - Filtros por status
  - Busca por nome, email ou cidade
  - Avatares coloridos com iniciais
  - Visualização de pedidos com barra de progresso
  - Exportação de dados (placeholder)

## 🧩 Componentes

### AdminShell
Wrapper principal que gerencia:
- Sidebar colapsável (desktop) e overlay (mobile)
- Estado persistente no localStorage
- Topbar integrada
- Área de conteúdo responsiva

**Props**:
```typescript
{
  children: ReactNode;
  title: string;
  subtitle?: string;
}
```

### AdminSidebar
Navegação lateral com:
- Logo da marca
- Menu hierárquico com subitems
- Indicadores de estado ativo
- Badges para notificações
- Animações suaves
- Modo colapsado

**Navegação**:
- Dashboard
- Vendas (Pedidos, Produtos, Categorias)
- Clientes
- Configurações (Análises, Definições)

### AdminTopbar
Barra superior com:
- Botão hamburger (mobile)
- Busca global
- Data atual
- Notificações
- Avatar e perfil do usuário

## 🎯 Padrões de UI

### Cards de Resumo (KPIs)
```tsx
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
  {stats.map((stat) => (
    <div className={`bg-white rounded-xl border ${stat.border} px-4 py-3.5 flex items-center gap-3`}>
      <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color} font-bold text-[15px] shrink-0`}>
        {stat.value}
      </div>
      <span className="text-[12.5px] text-[#666] font-medium">{stat.label}</span>
    </div>
  ))}
</div>
```

### Tabs de Filtro
```tsx
<div className="flex items-center gap-0 border-b border-[#f0f0f0]">
  {tabs.map(({ key, label }) => (
    <button
      className={`flex shrink-0 items-center gap-1.5 px-4 py-3.5 text-[12.5px] font-medium border-b-2 transition-colors ${
        activeTab === key
          ? "border-[#008060] text-[#008060]"
          : "border-transparent text-[#888] hover:text-[#333]"
      }`}
    >
      {label}
      <span className="badge">{count}</span>
    </button>
  ))}
</div>
```

### Badges de Status
```tsx
const STATUS_CONFIG = {
  pending: {
    label: "Pendente",
    style: "bg-yellow-50 text-yellow-700 border border-yellow-100",
    dot: "bg-yellow-400"
  },
  // ... outros status
};

<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.style}`}>
  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
  {cfg.label}
</span>
```

### Input de Busca
```tsx
<div className="relative w-full sm:w-[280px]">
  <input
    type="search"
    placeholder="Pesquisar..."
    className="w-full h-9 pl-9 pr-4 text-[13px] bg-[#f5f5f5] border border-transparent rounded-lg outline-none focus:bg-white focus:border-[#008060]/30 focus:ring-2 focus:ring-[#008060]/10 transition-all placeholder:text-[#bbb]"
  />
  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]">
    {/* Ícone de busca */}
  </svg>
</div>
```

## 🚀 Como Usar

### Acessar o Admin
```bash
# Navegue para o painel
http://localhost:3000/admin
```

### Adicionar Nova Página
1. Criar arquivo em `src/app/admin/[nome]/page.tsx`
2. Usar o componente `AdminShell`:

```tsx
"use client";

import { AdminShell } from "@/components/admin/admin-shell";

export default function MinhaNovaPage() {
  return (
    <AdminShell title="Título" subtitle="Descrição">
      {/* Seu conteúdo aqui */}
    </AdminShell>
  );
}
```

3. Adicionar rota na sidebar (`admin-sidebar.tsx`):

```tsx
{
  href: "/admin/minha-rota",
  label: "Meu Menu",
  icon: icons.meuIcone,
}
```

## 📱 Responsividade

O sistema é totalmente responsivo:

### Mobile (< 768px)
- Sidebar em overlay
- Cards em coluna única
- Tabelas com scroll horizontal
- Campos ocultos em telas pequenas

### Tablet (768px - 1024px)
- Sidebar permanente
- Cards em 2-3 colunas
- Tabelas com algumas colunas ocultas

### Desktop (> 1024px)
- Sidebar colapsável
- Todas as funcionalidades visíveis
- Layout otimizado

## 🎨 Customização

### Cores
Para alterar a cor principal, substitua todas as ocorrências de `#008060` pela cor desejada nos arquivos:
- `admin-sidebar.tsx`
- `admin-topbar.tsx`
- Páginas individuais

### Ícones
Os ícones usam SVGs inline para melhor performance. Para adicionar novos:

```tsx
const meuIcone = (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    {/* Paths do ícone */}
  </svg>
);
```

## 🔒 Autenticação (Próximos Passos)

Para adicionar autenticação:
1. Implementar middleware de autenticação
2. Adicionar verificação no `layout.tsx`
3. Redirecionar para login se não autenticado
4. Integrar com sistema de usuários

## 📊 Dados Mock

Atualmente todas as páginas usam dados mock (hardcoded). Para integrar com API:

1. Substituir arrays mock por chamadas de API:
```tsx
// Antes
const [orders] = useState(mockOrders);

// Depois
const [orders, setOrders] = useState([]);

useEffect(() => {
  fetch('/api/orders')
    .then(res => res.json())
    .then(data => setOrders(data));
}, []);
```

## 🎯 Próximas Features

- [ ] Sistema de autenticação
- [ ] Integração com API real
- [ ] Modals de criação/edição funcionais
- [ ] Exportação de dados (CSV, PDF)
- [ ] Gráficos e análises
- [ ] Notificações em tempo real
- [ ] Upload de imagens
- [ ] Filtros avançados
- [ ] Paginação real
- [ ] Pesquisa global funcional

## 📝 Notas de Desenvolvimento

### Performance
- Uso de `useMemo` para cálculos pesados
- Componentes otimizados sem re-renders desnecessários
- CSS com Tailwind para bundle menor

### Acessibilidade
- Labels semânticos
- Aria-labels em botões
- Contraste adequado de cores
- Navegação por teclado

### Manutenibilidade
- Código limpo e comentado
- Padrões consistentes
- Componentes reutilizáveis
- TypeScript para type safety

---

**Desenvolvido com base no design do Cliro** 🎨
Design inspirado em padrões modernos e profissionais de dashboards administrativos.
