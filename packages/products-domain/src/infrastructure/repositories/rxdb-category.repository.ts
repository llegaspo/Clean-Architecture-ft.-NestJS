import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICategoryRepository } from '../../application/interfaces/category-repository.interface';
import { PRODUCT_DATABASE } from '../rxdb/database.provider';
import type { ProductDatabase } from '../rxdb/database.type';
import { CategoryCollection, CategoryDocType } from '../rxdb/category.schema';
import { Category } from '../../domain/entities/category.entity';

@Injectable()
export class RxdbCategoryRepository implements ICategoryRepository {
  private readonly categoryCollections: CategoryCollection;
  constructor(
    @Inject(PRODUCT_DATABASE)
    private readonly categoryDatabase: ProductDatabase,
  ) {
    this.categoryCollections = this.categoryDatabase.categories;
  }

  private toDomain(raw: CategoryDocType): Category {
    return Category.reconstitute({
      id: raw.id,
      name: raw.name,
    });
  }

  private toPersistence(category: Category): CategoryDocType {
    return {
      id: category.id ?? Date.now(),
      name: category.name,
    };
  }

  async save(category: Category): Promise<Category> {
    const categoryData = this.toPersistence(category);
    if (categoryData.id) {
      const updated = await this.categoryCollections.upsert(categoryData);
      return this.toDomain(updated.toJSON());
    } else {
      const newCategory =
        await this.categoryCollections.insertIfNotExists(categoryData);
      return this.toDomain(newCategory.toJSON());
    }
  }

  async findAll(): Promise<Category[]> {
    const allCategories = await this.categoryCollections.find().exec();

    return allCategories.map((category) => this.toDomain(category));
  }

  async findById(id: number): Promise<Category | null> {
    const category = await this.categoryCollections
      .findOne({
        selector: {
          id: {
            $eq: id,
          },
        },
      })
      .exec();
    if (category) return this.toDomain(category.toJSON());
    return null;
  }

  async findByExactName(name: string): Promise<Category | null> {
    const category = await this.categoryCollections
      .findOne({
        selector: {
          name: {
            $eq: name,
          },
        },
      })
      .exec();
    if (category) return this.toDomain(category.toJSON());

    return null;
  }

  async delete(id: number): Promise<void> {
    const toBeDeleted = await this.categoryCollections
      .findOne({
        selector: {
          id: {
            $eq: id,
          },
        },
      })
      .exec();
    if (toBeDeleted === null)
      throw new NotFoundException('Category doesnt exist');
    await toBeDeleted.remove();
  }
}
