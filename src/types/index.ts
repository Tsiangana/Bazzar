export * from './product';
export * from './assessment';
export * from './trade-in';
export * from './sell';
export * from './auction';
export * from './cart';
export * from './user';
export * from './order';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}
