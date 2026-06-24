import { IUseCase } from '../../../interfaces/use-case.interface';
import { IProductRepository } from '../../../interfaces/product-repository.interface';

import { Product } from '../../../../domain/entities/product.entity';
import { ProductFilters } from '../../../interfaces/product-repository.interface';

export class ListProductsUseCase implements IUseCase<
  ProductFilters,
  Product[]
> {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input?: ProductFilters): Promise<Product[]> {
    return this.productRepository.findMany(input);
  }
}
