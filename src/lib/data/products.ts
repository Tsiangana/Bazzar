/**
 * Dados de demonstração do catálogo.
 * As imagens são placeholders do Unsplash — substituir por fotografias reais.
 */

export interface CatalogProduct {
  id: string;
  name: string;
  image: string;
  colors: string[]; // hex das cores disponíveis
  extraColors?: number;
  rating: number;
  reviewsCount: number;
  price: number;
  newPrice: number; // preço do equivalente novo
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    image:
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=640&q=80',
    colors: ['#9bc4bc', '#f5f5f0', '#1d1d1f', '#f2c9cf'],
    extraColors: 3,
    rating: 4.6,
    reviewsCount: 12622,
    price: 558000,
    newPrice: 989000,
  },
  {
    id: 'iphone-16-plus',
    name: 'iPhone 16 Plus',
    image:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=640&q=80',
    colors: ['#9bc4bc', '#f5f5f0', '#1d1d1f', '#f2c9cf'],
    extraColors: 3,
    rating: 4.6,
    reviewsCount: 3186,
    price: 600000,
    newPrice: 1139000,
  },
  {
    id: 'iphone-15-plus',
    name: 'iPhone 15 Plus',
    image:
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=640&q=80',
    colors: ['#f7e96e', '#a7b8cc', '#1d1d1f', '#f2c9cf'],
    extraColors: 1,
    rating: 4.5,
    reviewsCount: 5607,
    price: 469000,
    newPrice: 989000,
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    image:
      'https://images.unsplash.com/photo-1695048132832-b41495f12eb4?w=640&q=80',
    colors: ['#f7e96e', '#a7b8cc', '#f2c9cf', '#1d1d1f'],
    extraColors: 1,
    rating: 4.6,
    reviewsCount: 34862,
    price: 386000,
    newPrice: 889000,
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    image:
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=640&q=80',
    colors: ['#d9cfc2', '#f5f5f0', '#1d1d1f', '#8a8d91'],
    rating: 4.7,
    reviewsCount: 8214,
    price: 890000,
    newPrice: 1479000,
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    image:
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=640&q=80',
    colors: ['#d9cfc2', '#f5f5f0', '#1d1d1f', '#8a8d91'],
    rating: 4.7,
    reviewsCount: 9861,
    price: 780000,
    newPrice: 1279000,
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    image:
      'https://images.unsplash.com/photo-1697284959152-32ef13855932?w=640&q=80',
    colors: ['#48495c', '#e3e4e5', '#1d1d1f', '#c9c4bd'],
    rating: 4.6,
    reviewsCount: 21437,
    price: 620000,
    newPrice: 1179000,
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    image:
      'https://images.unsplash.com/photo-1695822822491-d92cee704368?w=640&q=80',
    colors: ['#48495c', '#e3e4e5', '#1d1d1f', '#c9c4bd'],
    rating: 4.7,
    reviewsCount: 18752,
    price: 720000,
    newPrice: 1329000,
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    image:
      'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=640&q=80',
    colors: ['#a7b8cc', '#f2c9cf', '#1d1d1f', '#f5f5f0'],
    extraColors: 2,
    rating: 4.5,
    reviewsCount: 40213,
    price: 310000,
    newPrice: 729000,
  },
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    image:
      'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=640&q=80',
    colors: ['#4e3c56', '#d9cfc2', '#1d1d1f', '#e3e4e5'],
    rating: 4.6,
    reviewsCount: 26504,
    price: 480000,
    newPrice: 999000,
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    image:
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=640&q=80',
    colors: ['#f2c9cf', '#a7b8cc', '#1d1d1f', '#3a5e50'],
    extraColors: 2,
    rating: 4.5,
    reviewsCount: 58109,
    price: 245000,
    newPrice: 599000,
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE (2022)',
    image:
      'https://images.unsplash.com/photo-1529653762956-b0a27278529c?w=640&q=80',
    colors: ['#1d1d1f', '#f5f5f0', '#b23a48'],
    rating: 4.4,
    reviewsCount: 14320,
    price: 138000,
    newPrice: 379000,
  },
];

export function getProduct(id: string): CatalogProduct | undefined {
  return catalogProducts.find((p) => p.id === id);
}

/** Fotografias de estilo de vida usadas nas secções da página inicial. */
export const lifestyleImages = {
  hero: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&q=80',
  offers:
    'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=900&q=80',
  categories: {
    pro: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=480&q=80',
    standard:
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=480&q=80',
    classic:
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=480&q=80',
    se: 'https://images.unsplash.com/photo-1529653762956-b0a27278529c?w=480&q=80',
    tradeIn:
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=480&q=80',
    auctions:
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=480&q=80',
    accessories:
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=480&q=80',
    deals:
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=480&q=80',
  },
  testimonials: [
    'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=480&q=80',
    'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=480&q=80',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=480&q=80',
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=480&q=80',
  ],
  pdp: {
    body: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=900&q=80',
    battery:
      'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=900&q=80',
    screen:
      'https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?w=900&q=80',
    sim: 'https://picsum.photos/seed/sim-card/900/700',
  },
};
