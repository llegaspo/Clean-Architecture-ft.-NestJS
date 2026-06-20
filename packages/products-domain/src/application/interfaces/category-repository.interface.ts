import { Category } from '../../domain/entities/category.entity';

export abstract class ICategoryRepository {
  abstract save(category: Category): Promise<Category>;
  abstract findById(id: number): Promise<Category | null>;
  abstract findByExactName(name: string): Promise<Category | null>;
  abstract findAll(): Promise<Category[]>;
  abstract delete(id: number): Promise<void>;
}
