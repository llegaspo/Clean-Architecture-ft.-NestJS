import { IUseCase } from '../../../interfaces/use-case.interface';
import {
  IProductRepository,
  type productFilters,
} from '../../../interfaces/product-repository.interface';

import { Product } from '../../../../domain/entities/product.entity';

export class ListProductsUseCase implements IUseCase<
  productFilters,
  Product[]
> {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: productFilters): Promise<Product[]> {
    return this.productRepository.findMany(input);
  }
}
