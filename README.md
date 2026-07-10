# 📱 iphonesAO

**Centro especializado em iPhones em Angola** — compra, venda, trade-in e leilões num único local.

> Não é apenas uma loja. É uma plataforma onde o utilizador resolve **todas** as necessidades relacionadas com um iPhone: comprar, trocar, vender ou renovar o seu dispositivo. A loja é apenas um dos serviços.

## 🎯 O Conceito

A empresa atua como **especialista em iPhones**: avalia, adquire, prepara, anuncia e comercializa todos os equipamentos. **Nunca existe venda direta entre utilizadores** — há apenas dois intervenientes: a empresa e o cliente.

Este modelo garante:

| Garantia | Como |
|---|---|
| Qualidade | Todos os equipamentos passam por inspeção técnica interna |
| Transparência | Fotografias reais, relatório técnico, saúde da bateria e estado estético publicados |
| Segurança | O cliente nunca negocia com estranhos |
| Preços consistentes | Avaliação padronizada pela empresa |
| Garantia | Todos os equipamentos vendidos incluem garantia |

## 🏛️ Os Quatro Pilares

### 1. Comprar (`/comprar`)
Catálogo de iPhones **novos**, **usados** e **remodelados**. Cada produto apresenta: fotografias reais, modelo, ano, cor, capacidade, estado estético, saúde da bateria, garantia, acessórios incluídos, relatório técnico e preço. O objetivo é eliminar qualquer dúvida antes da compra.

### 2. Trade-In (`/trade-in`)
O cliente escolhe um novo iPhone e entrega o atual:

```
Escolher novo iPhone → Avaliar o atual → Estimativa → Envio →
Inspeção → Confirmação/ajuste do valor → Desconto na compra
```

### 3. Vender (`/vender`)
Para quem não quer comprar outro equipamento — venda direta à empresa:

```
Pedido de avaliação → Estimativa → Envio → Inspeção →
Confirmação do valor → Pagamento
```

Depois disso, a empresa decide: restaurar, reparar, revender ou colocar em leilão.

### 4. Leilões (`/leiloes`)
Os equipamentos em leilão pertencem **exclusivamente à empresa** (origem: trade-in, compras a clientes, stock próprio, modelos raros). O cliente acompanha o preço atual, tempo restante, histórico de lances e número de participantes. O maior lance vence. **Nenhum utilizador cria leilões.**

## 🔄 Ciclo de Vida de um iPhone

O coração do projeto — cada equipamento é acompanhado do antigo ao novo proprietário:

```
Cliente possui um iPhone
        ↓
Quer trocar ou vender → Solicita avaliação → Empresa analisa → Cliente envia
        ↓
Inspeção técnica → Limpeza → Reparação (se necessário) → Classificação → Fotografia
        ↓
Entrada em stock → Venda direta OU Leilão → Novo proprietário
```

Estas fases estão modeladas no tipo `LifecycleStage` (`src/types/product.ts`).

## 🚀 Tecnologias

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript (strict mode)
- **Estilização**: Tailwind CSS v4
- **Qualidade**: ESLint + Prettier

## 📁 Estrutura do Projeto

```
src/
├── app/                      # App Router — rotas da aplicação
│   ├── page.tsx              # Home: apresentação dos 4 pilares
│   ├── layout.tsx            # Root layout (Header + Footer)
│   ├── comprar/              # Pilar 1 — Catálogo
│   │   ├── page.tsx          #   Listagem com filtros
│   │   └── [id]/page.tsx     #   Detalhe do equipamento
│   ├── trade-in/page.tsx     # Pilar 2 — Troca
│   ├── vender/page.tsx       # Pilar 3 — Venda à empresa
│   ├── leiloes/              # Pilar 4 — Leilões
│   │   ├── page.tsx          #   Leilões ativos
│   │   └── [id]/page.tsx     #   Detalhe do leilão (lances, tempo)
│   └── como-funciona/page.tsx # Modelo de negócio e ciclo de vida
│
├── components/
│   ├── layout/               # Header, Footer
│   ├── ui/                   # Componentes UI reutilizáveis
│   └── features/             # Componentes por funcionalidade
│
├── types/                    # Modelo de domínio
│   ├── product.ts            # Equipamento, condição, relatório técnico, ciclo de vida
│   ├── assessment.ts         # Avaliação do equipamento do cliente + estimativa
│   ├── trade-in.ts           # Pedido de trade-in e respetivos estados
│   ├── sell.ts               # Venda à empresa e respetivos estados
│   ├── auction.ts            # Leilões, lances
│   ├── cart.ts               # Carrinho
│   ├── order.ts              # Encomendas
│   └── user.ts               # Utilizadores e moradas
│
├── config/site.ts            # Nome, contactos, navegação, moeda, locale
├── constants/index.ts        # Labels de estados, modelos, capacidades, cores
└── lib/utils/                # formatPrice (AOA), formatDate (pt-AO), cn, ...
```

### Modelo de domínio — visão rápida

- **`Product`** — um iPhone da empresa: condição (`novo | usado | remodelado`), grau estético (`A+ | A | B | C`), saúde da bateria, garantia, acessórios, relatório técnico, origem (`trade_in | compra_a_cliente | stock_proprio`) e fase do ciclo de vida.
- **`DeviceAssessment`** — o cliente descreve o seu equipamento (bateria, ecrã, traseira, Face ID, câmara, botões, danos, caixa, carregador); partilhado entre Trade-In e Venda.
- **`Estimate`** — valor estimado pelo sistema; após inspeção física, o valor é confirmado ou ajustado.
- **`TradeInRequest` / `SellRequest`** — fluxos com estados explícitos, do pedido ao pagamento/desconto.
- **`Auction` / `Bid`** — leilões da empresa com preço atual, incremento mínimo, lances e participantes.

## 🏁 Começando

### Pré-requisitos

- Node.js 20+
- npm

### Instalação

```bash
git clone <url-do-repositorio>
cd Bazzar
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linter
npm run format       # Formatar com Prettier
npm run type-check   # Verificação de tipos
```

## 🌍 Localização

Configurado para o mercado angolano:
- **Moeda**: Kwanza (AOA) — `formatPrice` em `src/lib/utils/format.ts`
- **Idioma**: Português (pt-AO)
- **Províncias**: Todas as províncias de Angola (`src/constants/index.ts`)

## 🎨 Padrões de Código

- **Componentes**: PascalCase (`ProductCard.tsx`)
- **Funções/variáveis**: camelCase (`formatPrice`)
- **Tipos/Interfaces**: PascalCase (`Product`, `TradeInRequest`)
- **Constantes**: UPPER_SNAKE_CASE (`TRADE_IN_STATUS_LABELS`)
- **Rotas**: kebab-case em português (`/como-funciona`, `/trade-in`)
- Imports ordenados: React/Next → externos → aliases `@/` → relativos

## 🗺️ Roadmap

### Fase 1 — Fundação (atual)
- [x] Modelo de domínio (tipos dos 4 pilares + ciclo de vida)
- [x] Estrutura de rotas e navegação
- [ ] Componentes UI base (Button, Card, Input, Badge)
- [ ] Catálogo com filtros (modelo, condição, preço, capacidade, bateria)

### Fase 2 — Transações
- [ ] Página de produto com relatório técnico
- [ ] Formulário de avaliação (Trade-In e Venda)
- [ ] Motor de estimativa de valor
- [ ] Carrinho e checkout
- [ ] Autenticação

### Fase 3 — Leilões
- [ ] Listagem de leilões com contagem decrescente
- [ ] Sistema de lances em tempo real
- [ ] Histórico de lances e participantes

### Fase 4 — Operação interna
- [ ] Painel administrativo (inspeção, classificação, gestão de stock)
- [ ] Acompanhamento do ciclo de vida dos equipamentos
- [ ] Notificações ao cliente em cada fase

### Expansão futura
Apple Watch, AirPods, iPad, MacBook, acessórios oficiais, serviços de reparação, seguro para dispositivos, programa de upgrade anual e programa de fidelização.

## 💎 Valores

Toda a comunicação da plataforma transmite: **confiança, transparência, segurança, qualidade, simplicidade, rapidez, especialização e sustentabilidade**.

## 📞 Contacto

- Email: contato@iphonesao.com
- WhatsApp: +244 900 000 000

---

Desenvolvido com ❤️ em Angola 🇦🇴
