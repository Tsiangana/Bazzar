# Componentes Features

Esta pasta contém componentes específicos de funcionalidades do e-commerce.

## Organização

Cada subpasta representa uma funcionalidade principal:

### `products/`
Componentes relacionados a produtos:
- Listagem de produtos
- Detalhes do produto
- Filtros e busca
- Cards de produto

### `cart/`
Componentes do carrinho de compras:
- Itens do carrinho
- Resumo do carrinho
- Drawer/modal do carrinho
- Estado vazio

### `checkout/`
Componentes do processo de checkout:
- Formulário de checkout
- Informações de envio
- Informações de pagamento
- Resumo do pedido

### `auth/`
Componentes de autenticação:
- Formulário de login
- Formulário de registro
- Recuperação de senha

### `orders/`
Componentes de pedidos:
- Listagem de pedidos
- Detalhes do pedido
- Status do pedido
- Rastreamento

### `wishlist/`
Componentes de lista de desejos:
- Botão adicionar/remover
- Grid de produtos favoritos

### `reviews/`
Componentes de avaliações:
- Listagem de avaliações
- Formulário de avaliação
- Rating stars

## Exemplo de Uso

```tsx
import { ProductCard } from '@/components/features/products/ProductCard';
import { CartDrawer } from '@/components/features/cart/CartDrawer';

export function ProductsPage() {
  return (
    <>
      <ProductCard product={product} />
      <CartDrawer />
    </>
  );
}
```
