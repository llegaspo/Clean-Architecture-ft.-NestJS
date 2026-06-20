import { IUseCase } from '../../../interfaces/use-case.interface';
import { ICategoryRepository } from '../../../interfaces/category-repository.interface';

import { Category } from '../../../../domain/entities/category.entity';

export class GetCategoryUseCase implements IUseCase<
  { id: number },
  Category | null
> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: { id: number }): Promise<Category | null> {
    return await this.categoryRepository.findById(input.id);
  }
}
