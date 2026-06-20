import { IUseCase } from '../../../interfaces/use-case.interface';
import { ICategoryRepository } from '../../../interfaces/category-repository.interface';

import { Category } from '../../../../domain/entities/category.entity';

export class CreateCategoryUseCase implements IUseCase<
  { name: string },
  Category
> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: { name: string }): Promise<Category> {
    const existingCategory = await this.categoryRepository.findByExactName(
      input.name,
    );

    if (existingCategory) throw new Error('Category already exists');

    const newCategory = Category.create(input);

    return await this.categoryRepository.save(newCategory);
  }
}
