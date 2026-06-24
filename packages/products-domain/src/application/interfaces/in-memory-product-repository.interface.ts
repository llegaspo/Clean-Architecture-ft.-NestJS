import { Product } from '../../domain/entities/product.entity';
import { ProductFilters } from './product-repository.interface';

export abstract class IInMemoryProductRepository {
  abstract save(product: Product): Product;
  abstract findById(productId: number): Product | null;
  abstract findMany(filters?: ProductFilters): Product[];
  abstract delete(productId: number): void;
}
