import { Product } from '../../domain/entities/product.entity';

export type productFilters = {
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  search?: string;
  limit?: number;
  offset?: number;
};

export abstract class IProductRepository {
  abstract save(product: Product): Promise<Product>;
  abstract findById(productId: string): Promise<Product | null>;
  abstract findMany(filters: productFilters): Promise<Product[]>;
  abstract findByCategoryId(categoryId: number): Promise<Product[] | null>;
  abstract findByExactName(name: string): Promise<Product | null>;
  abstract delete(productId: string): Promise<void>;
}
