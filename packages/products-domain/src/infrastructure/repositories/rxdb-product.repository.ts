import { Inject, Injectable } from '@nestjs/common';
import {
  IProductRepository,
  productFilters,
} from '../../application/interfaces/product-repository.interface';
import { PRODUCT_DATABASE } from '../rxdb/database.provider';
import type { ProductDatabase } from '../rxdb/database.type';
import { Product } from '../../domain/entities/product.entity';
import { ProductDocType } from '../rxdb/product.schema';

@Injectable()
export class RxdbProductRepository implements IProductRepository {
  private readonly ProductCollections;
  constructor(
    @Inject(PRODUCT_DATABASE)
    private readonly db: ProductDatabase,
  ) {
    this.ProductCollections = this.db.products;
  }

  private toPersistence(product: Product): ProductDocType {
    return {
      productId: product.id ?? crypto.randomUUID(),
      name: product.name,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId ?? undefined,
    };
  }

  private toDomain(raw: ProductDocType): Product {
    return Product.reconstitute({
      productId: raw.productId,
      name: raw.name,
      price: raw.price,
      stock: raw.stock,
      categoryId: raw.categoryId,
    });
  }

  async save(product: Product): Promise<Product> {
    const productData = this.toPersistence(product);
    if (product.id) {
      const updatedProduct = await this.ProductCollections.upsert(productData);
      return this.toDomain(updatedProduct.toJSON());
    } else {
      const newProduct =
        await this.ProductCollections.insertIfNotExists(productData);
      return this.toDomain(newProduct.toJSON());
    }
  }

  async findById(productId: string): Promise<Product | null> {
    const fetchedProduct =
      await this.ProductCollections.findOne(productId).exec();
    if (fetchedProduct) return this.toDomain(fetchedProduct.toJSON());
    return null;
  }

  async findMany(filters: productFilters): Promise<Product[]> {
    const selector: Record<string, unknown> = {};

    if (filters.categoryId != null) {
      selector.categoryId = {
        $eq: filters.categoryId,
      };
    }

    if (filters.minPrice != null || filters.maxPrice != null) {
      selector.price = {};

      if (filters.minPrice != null) {
        (selector.price as Record<string, number>).$gte = filters.minPrice;
      }

      if (filters.maxPrice != null) {
        (selector.price as Record<string, number>).$lte = filters.maxPrice;
      }
    }

    if (filters.search != null && filters.search.trim() !== '') {
      selector.name = {
        $regex: `.*${filters.search.trim()}.*`,
      };
    }

    const products = await this.ProductCollections.find({
      selector,
      limit: filters.limit,
      skip: filters.offset,
    }).exec();

    return products.map((product) => this.toDomain(product.toJSON()));
  }

  async delete(productId: string): Promise<void> {
    const productDoc = this.ProductCollections.findOne(productId);
    await productDoc.remove();
  }
}
