import { IUseCase } from '../../../interfaces/use-case.interface';
import { ICategoryRepository } from '../../../interfaces/category-repository.interface';
import { IProductRepository } from '../../../interfaces/product-repository.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class DeleteCategoryUseCase implements IUseCase<{ id: number }, void> {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(input: { id: number }): Promise<void> {
    const toBeDeleted = await this.categoryRepository.findById(input.id);

    if (!toBeDeleted)
      throw new NotFoundException('Cannot delete non-existent Category');

    const assignedProducts = await this.productRepository.findMany({
      categoryId: input.id,
    });

    console.log('assgined products', assignedProducts);

    if (assignedProducts !== null && assignedProducts.length > 0)
      throw new BadRequestException(
        'Cannot delete category with existing products',
      );

    await this.categoryRepository.delete(input.id);
  }
}
