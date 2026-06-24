import { IUseCase } from '../../../interfaces/use-case.interface';
import { IProductRepository } from '../../../interfaces/product-repository.interface';

import { Product } from '../../../../domain/entities/product.entity';

export class GetProductUseCase implements IUseCase<
  { id: number },
  Product | null
> {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: { id: number }): Promise<Product | null> {
    return this.productRepository.findById(input.id);
  }
}
