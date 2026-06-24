import { IUseCase } from '../../../interfaces/use-case.interface';
import { IProductRepository } from '../../../interfaces/product-repository.interface';

import { Product } from '../../../../domain/entities/product.entity';
import { ICategoryRepository } from '../../../interfaces/category-repository.interface';
import { NotFoundException } from '@nestjs/common';

export type CreateProductInput = {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
};

export class CreateProductUseCase implements IUseCase<
  CreateProductInput,
  Product
> {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const category = await this.categoryRepository.findById(
      input.categoryId ?? 0,
    );

    if (!category) throw new NotFoundException('Category does not exist');

    const newProduct = Product.create({
      ...input,
    });

    return await this.productRepository.save(newProduct);
  }
}
