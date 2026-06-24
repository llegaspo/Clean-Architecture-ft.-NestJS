import { IUseCase } from '../../../interfaces/use-case.interface';
import { ICategoryRepository } from '../../../interfaces/category-repository.interface';

import { Category } from '../../../../domain/entities/category.entity';
import { BadRequestException } from '@nestjs/common';

export class CreateCategoryUseCase implements IUseCase<
  { name: string },
  Category
> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: { name: string }): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByExactName(
      input.name,
    );

    if (existingCategory)
      throw new BadRequestException('Category already exists');

    const newCategory = Category.create(input);

    return await this.categoryRepository.save(newCategory);
  }
}
