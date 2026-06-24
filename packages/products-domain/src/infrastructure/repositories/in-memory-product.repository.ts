import { Injectable } from '@nestjs/common';
import { IInMemoryProductRepository } from '../../application/interfaces/in-memory-product-repository.interface';
import { ProductFilters } from '../../application/interfaces/product-repository.interface';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class InMemoryProductRepository implements IInMemoryProductRepository {
  private products: Product[] = [];
  private nextId = 1;

  save(product: Product): Product {
    if (product.id !== null) {
      const index = this.products.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        this.products[index] = product;
      } else {
        this.products.push(product);
      }

      return product;
    }

    const created = Product.reconstitute({
      productId: this.nextId++,
      name: product.name,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
    });

    this.products.push(created);
    return created;
  }

  findById(productId: number): Product | null {
    return this.products.find((product) => product.id === productId) ?? null;
  }

  findMany(filters?: ProductFilters): Product[] {
    return this.products.filter((product) => {
      if (
        filters?.categoryId !== undefined &&
        product.categoryId !== filters.categoryId
      ) {
        return false;
      }

      if (
        filters?.search?.trim() &&
        !product.name.toLowerCase().includes(filters.search.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        filters?.minPrice !== undefined &&
        product.price < filters.minPrice
      ) {
        return false;
      }

      if (
        filters?.maxPrice !== undefined &&
        product.price > filters.maxPrice
      ) {
        return false;
      }

      return true;
    });
  }

  delete(productId: number): void {
    this.products = this.products.filter((product) => product.id !== productId);
  }
}
