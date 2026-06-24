import { Category } from '../../domain/entities/category.entity';

export abstract class IInMemoryCategoryRepository {
  abstract save(category: Category): Category;
  abstract findById(id: number): Category | null;
  abstract findByExactName(name: string): Category | null;
  abstract findAll(): Category[];
  abstract delete(id: number): void;
}
