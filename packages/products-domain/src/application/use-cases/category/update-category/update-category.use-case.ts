import { IUseCase } from '../../../interfaces/use-case.interface';
import { ICategoryRepository } from '../../../interfaces/category-repository.interface';

import { Category } from '../../../../domain/entities/category.entity';
export class UpdateCategoryUseCase implements IUseCase<
  { id: number; name?: string },
  Category
> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: { id: number; name?: string }): Promise<Category> {
    const toBeUpdated = await this.categoryRepository.findById(input.id);

    if (!toBeUpdated) throw new Error('Categroy doesnt exists');

    toBeUpdated.update({
      name: input.name,
    });

    return await this.categoryRepository.save(toBeUpdated);
  }
}
