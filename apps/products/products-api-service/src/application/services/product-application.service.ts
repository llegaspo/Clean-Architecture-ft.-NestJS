import { Injectable } from '@nestjs/common';
import productResponseSchema, {
  type ProductResponse,
} from '../dto/product-response.dto.ts';
import {
  CreateProductUseCase,
  type CreateProductInput,
} from 'packages/products-domain/src/application/use-cases/products/create-product/create-product.use-case.js';
import { UpdateProductUseCase } from 'packages/products-domain/src/application/use-cases/products/update-product/update-product.use-case.js';
import { DeleteProductUseCase } from 'packages/products-domain/src/application/use-cases/products/delete-product/delete-product.use-case.js';
import { GetProductUseCase } from 'packages/products-domain/src/application/use-cases/products/get-product/get-product.use-case.js';
import { ListProductsUseCase } from 'packages/products-domain/src/application/use-cases/products/list-products/list-products.use-case.js';
import { Product } from 'packages/products-domain/src/domain/entities/product.entity.js';
import { type productFilters } from 'packages/products-domain/src/application/interfaces/product-repository.interface.js';

@Injectable()
export class ProductApplicationService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
  ) {}

  private toDto(product: Product): ProductResponse {
    return productResponseSchema.parse({
      productId: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
    });
  }

  async createProduct(input: CreateProductInput): Promise<ProductResponse> {
    const product = await this.createProductUseCase.execute(input);
    return this.toDto(product);
  }

  async updateProduct(
    input: Partial<CreateProductInput> & { id: string },
  ): Promise<ProductResponse> {
    const updatedProduct = await this.updateProductUseCase.execute(input);
    return this.toDto(updatedProduct);
  }

  async deleteProduct(input: { id: string }): Promise<void> {
    await this.deleteProductUseCase.execute(input);
  }

  async getProduct(input: { id: string }): Promise<ProductResponse | null> {
    const getProduct = await this.getProductUseCase.execute(input);
    if (getProduct != null) return this.toDto(getProduct);
    return null;
  }

  async listProducts(input: productFilters): Promise<ProductResponse[]> {
    const productList = await this.listProductsUseCase.execute(input);
    return productList.map((product) => this.toDto(product));
  }
}
