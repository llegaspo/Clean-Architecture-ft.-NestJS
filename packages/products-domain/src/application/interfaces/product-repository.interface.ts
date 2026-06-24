import { Product } from '../../domain/entities/product.entity';

export type ProductPagination = {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type ProductFilters = {
  categoryId?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
};

export abstract class IProductRepository {
  abstract save(product: Product): Promise<Product>;
  abstract findById(productId: number): Promise<Product | null>;
  abstract findMany(filters?: ProductFilters): Promise<Product[]>;
  abstract delete(productId: number): Promise<void>;
}
