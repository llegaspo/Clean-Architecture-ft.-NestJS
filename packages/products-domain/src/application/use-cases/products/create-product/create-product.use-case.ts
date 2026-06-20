import { IUseCase } from '../../../interfaces/use-case.interface';
import { IProductRepository } from '../../../interfaces/product-repository.interface';

import { Product } from '../../../../domain/entities/product.entity';

type CreateProductInput = {
  name: string;
  price: number;
  stock: number;
  categoryId?: number;
};

export class CreateProductUseCase implements IUseCase<
  CreateProductInput,
  Product
> {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const existingProduct = await this.productRepository.findByExactName(
      input.name,
    );
    if (existingProduct) throw new Error('Product is already listed');

    const newProduct = Product.create({
      ...input,
    });

    return await this.productRepository.save(newProduct);
  }
}
