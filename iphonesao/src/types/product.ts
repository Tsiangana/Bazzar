export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  brand: string;
  model: string;
  storage: string;
  color: string;
  images: string[];
  thumbnail: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewsCount: number;
  specifications: ProductSpecification[];
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductFilter {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  storage?: string[];
  color?: string[];
  inStock?: boolean;
  search?: string;
}

export interface ProductSortOption {
  field: 'price' | 'name' | 'rating' | 'createdAt';
  order: 'asc' | 'desc';
}
