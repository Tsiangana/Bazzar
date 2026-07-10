/**
 * Um iPhone comercializado pela empresa.
 * Todos os equipamentos pertencem à empresa — nunca há venda entre utilizadores.
 */

export type DeviceCondition = 'novo' | 'usado' | 'remodelado';

/** Classificação estética atribuída na inspeção técnica interna. */
export type AestheticGrade = 'A+' | 'A' | 'B' | 'C';

/** Origem do equipamento no stock da empresa. */
export type DeviceOrigin = 'trade_in' | 'compra_a_cliente' | 'stock_proprio';

/**
 * Fases do ciclo de vida de um equipamento dentro da empresa,
 * desde a receção até à venda.
 */
export type LifecycleStage =
  | 'recebido'
  | 'em_inspecao'
  | 'em_limpeza'
  | 'em_reparacao'
  | 'classificado'
  | 'fotografado'
  | 'em_stock'
  | 'a_venda'
  | 'em_leilao'
  | 'vendido';

export interface TechnicalReport {
  inspectedAt: Date;
  batteryHealth: number; // percentagem 0–100
  screenCondition: string;
  backCondition: string;
  faceIdWorking: boolean;
  camerasWorking: boolean;
  buttonsWorking: boolean;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  model: string; // ex.: "iPhone 15 Pro"
  year: number;
  color: string;
  storage: string; // ex.: "256GB"
  condition: DeviceCondition;
  aestheticGrade: AestheticGrade;
  batteryHealth: number; // percentagem 0–100
  warrantyMonths: number;
  includedAccessories: string[]; // ex.: ["Caixa original", "Cabo USB-C"]
  technicalReport: TechnicalReport;
  origin: DeviceOrigin;
  lifecycleStage: LifecycleStage;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[]; // fotografias reais do equipamento
  thumbnail: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilter {
  model?: string;
  condition?: DeviceCondition[];
  minPrice?: number;
  maxPrice?: number;
  storage?: string[];
  color?: string[];
  minBatteryHealth?: number;
  inStock?: boolean;
  search?: string;
}

export interface ProductSortOption {
  field: 'price' | 'name' | 'rating' | 'createdAt' | 'batteryHealth';
  order: 'asc' | 'desc';
}
