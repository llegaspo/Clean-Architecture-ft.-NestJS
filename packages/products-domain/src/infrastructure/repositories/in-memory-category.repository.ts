import { Injectable } from '@nestjs/common';
import { IInMemoryCategoryRepository } from '../../application/interfaces/in-memory-category-repository.interface';
import { Category } from '../../domain/entities/category.entity';

@Injectable()
export class InMemoryCategoryRepository implements IInMemoryCategoryRepository {
  private categories: Category[] = [];
  private nextId = 1;

  save(category: Category): Category {
    if (category.id !== null) {
      const index = this.categories.findIndex(
        (item) => item.id === category.id,
      );

      if (index >= 0) {
        this.categories[index] = category;
      } else {
        this.categories.push(category);
      }

      return category;
    }

    const created = Category.reconstitute({
      id: this.nextId++,
      name: category.name,
    });

    this.categories.push(created);
    return created;
  }

  findById(id: number): Category | null {
    return this.categories.find((category) => category.id === id) ?? null;
  }

  findByExactName(name: string): Category | null {
    return this.categories.find((category) => category.name === name) ?? null;
  }

  findAll(): Category[] {
    return this.categories;
  }

  delete(id: number): void {
    this.categories = this.categories.filter((category) => category.id !== id);
  }
}
