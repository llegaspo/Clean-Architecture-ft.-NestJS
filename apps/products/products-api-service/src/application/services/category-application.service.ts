import { Injectable } from '@nestjs/common';
import categoryResponseSchema, {
  CategoryResponse,
} from '../dto/category-response.dto';

import { CreateCategoryUseCase } from 'packages/products-domain/src/application/use-cases/category/create-category/create-category.use-case';
import { DeleteCategoryUseCase } from 'packages/products-domain/src/application/use-cases/category/delete-cateogry/delete-category.use-case';
import { GetCategoryUseCase } from 'packages/products-domain/src/application/use-cases/category/get-category/get-category.use-case';
import { ListCategoriesUseCase } from 'packages/products-domain/src/application/use-cases/category/list-categories/list-categories.use-case';
import { UpdateCategoryUseCase } from 'packages/products-domain/src/application/use-cases/category/update-category/update-category.use-case';
import { Category } from 'packages/products-domain/src/domain/entities/category.entity';

@Injectable()
export class CategoryApplicationService {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
    private readonly listategoryUseCase: ListCategoriesUseCase,
  ) {}

  private toDto(category: Category): CategoryResponse {
    return categoryResponseSchema.parse({
      categoryId: category.id,
      name: category.name,
    });
  }

  async createcategory(input: { name: string }): Promise<CategoryResponse> {
    const newCategory = await this.createCategoryUseCase.execute(input);
    return this.toDto(newCategory);
  }

  async updateCategory(input: {
    id: number;
    name?: string;
  }): Promise<CategoryResponse> {
    const updatedCategory = await this.updateCategoryUseCase.execute(input);
    return this.toDto(updatedCategory);
  }

  async deleteCategory(input: { id: number }): Promise<void> {
    await this.deleteCategoryUseCase.execute(input);
  }

  async listCategories(): Promise<CategoryResponse[]> {
    const categoryArray = await this.listategoryUseCase.execute();
    return categoryArray.map((category) => this.toDto(category));
  }

  async getCategory(input: { id: number }): Promise<CategoryResponse | null> {
    const category = await this.getCategoryUseCase.execute(input);
    if (category != null) return this.toDto(category);
    return null;
  }
}
