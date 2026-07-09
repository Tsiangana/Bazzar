import { Product } from './product';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  addedAt: Date;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  discount?: number;
  couponCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartSummary {
  itemsCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
}
