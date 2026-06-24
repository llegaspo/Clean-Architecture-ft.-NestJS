import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IProductRepository,
  type ProductPagination,
} from '../../application/interfaces/product-repository.interface';
import { PRODUCT_DATABASE } from '../rxdb/database.provider';
import type { ProductDatabase } from '../rxdb/database.type';
import { Product } from '../../domain/entities/product.entity';
import { ProductDocType } from '../rxdb/product.schema';
import { ProductFilters } from '../../application/interfaces/product-repository.interface';

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
      id: product.id ?? Date.now(),
      name: product.name,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
    };
  }

  private toDomain(raw: ProductDocType): Product {
    return Product.reconstitute({
      productId: raw.id,
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

  async findById(productId: number): Promise<Product | null> {
    const fetchedProduct = await this.ProductCollections.findOne({
      selector: {
        id: {
          $eq: productId,
        },
      },
    }).exec();
    if (fetchedProduct) return this.toDomain(fetchedProduct.toJSON());
    return null;
  }

  async findMany(filters?: ProductFilters): Promise<Product[]> {
    const selector: Record<string, Record<string, number>> = {};

    if (filters?.categoryId !== undefined) {
      selector.categoryId = { $eq: filters.categoryId };
    }
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      selector.price = {};

      if (filters.minPrice !== undefined) {
        selector.price = { $gte: filters.minPrice };
      }
      if (filters.maxPrice !== undefined) {
        selector.price = { $lte: filters.maxPrice };
      }
    }

    let products = await this.ProductCollections.find({
      selector,
    }).exec();

    if (filters?.search?.trim()) {
      const search = filters.search.trim().toLowerCase();
      products = products.filter((product) =>
        product.name.trim().toLowerCase().includes(search),
      );
    }

    return products.map((product) => this.toDomain(product.toJSON()));
  }

  async delete(productId: number): Promise<void> {
    const productDoc = this.ProductCollections.findOne({
      selector: {
        id: {
          $eq: productId,
        },
      },
    });
    if (!productDoc) throw new NotFoundException('Product not found');
    await productDoc.remove();
  }

  async findByName(productName: string): Promise<Product[]> {
    const allProductDoc = await this.ProductCollections.find().exec();

    const filteredProduct = allProductDoc.filter((product) =>
      product.name.toLowerCase().includes(productName.toLowerCase()),
    );
    return filteredProduct.map((product) => this.toDomain(product.toJSON()));
  }

  async findByPage(page: number, limit: number): Promise<ProductPagination> {
    const allProduct = await this.ProductCollections.find().exec();
    const pages = Math.ceil(allProduct.length / limit);
    const start = limit * (page - 1);
    const end = start + limit - 1;

    return {
      data: allProduct
        .slice(start, end)
        .map((product) => this.toDomain(product.toJSON())),
      meta: {
        total: allProduct.length,
        page: page,
        limit: limit,
        totalPages: pages,
      },
    };
  }
  async findByPrice(minPrice?: number, maxPrice?: number): Promise<Product[]> {
    let selector = {};
    if (minPrice != undefined && maxPrice != undefined) {
      if (minPrice > maxPrice)
        throw new BadRequestException(
          'min price cannot be greater than the max price',
        );
      selector = {
        price: {
          $gte: minPrice,
          $lte: maxPrice,
        },
      };
    } else if (minPrice != undefined && maxPrice == undefined)
      selector = {
        price: {
          $gte: minPrice,
        },
      };
    else if (minPrice == undefined && maxPrice != undefined)
      selector = {
        price: {
          $lte: maxPrice,
        },
      };

    const filteredProduct = await this.ProductCollections.find({
      selector,
    }).exec();

    return filteredProduct.map((product) => this.toDomain(product.toJSON()));
  }
}
