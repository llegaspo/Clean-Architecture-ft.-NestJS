import { IUseCase } from '../../../interfaces/use-case.interface';
import { IProductRepository } from '../../../interfaces/product-repository.interface';

import { Product } from '../../../../domain/entities/product.entity';
import type { CreateProductInput } from '../create-product/create-product.use-case';

type UpdateProductInput = Partial<CreateProductInput> & { id: string };

export class UpdateProductUseCase implements IUseCase<
  UpdateProductInput,
  Product
> {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: UpdateProductInput): Promise<Product> {
    const toBeUpdated = await this.productRepository.findById(input.id);

    if (!toBeUpdated) throw new Error('Product doesnt exist');

    toBeUpdated.update({
      name: input.name,
      price: input.price,
      stock: input.stock,
      categoryId: input.categoryId,
    });

    return await this.productRepository.save(toBeUpdated);
  }
}
