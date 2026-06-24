import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import productResponseSchema, {
  type ProductResponse,
  type ProductPaginationResponse,
} from '../dto/product-response.dto';
import {
  CreateProductUseCase,
  type CreateProductInput,
} from 'packages/products-domain/src/application/use-cases/products/create-product/create-product.use-case';
import { UpdateProductUseCase } from 'packages/products-domain/src/application/use-cases/products/update-product/update-product.use-case';
import { DeleteProductUseCase } from 'packages/products-domain/src/application/use-cases/products/delete-product/delete-product.use-case';
import { GetProductUseCase } from 'packages/products-domain/src/application/use-cases/products/get-product/get-product.use-case';
import { ListProductsUseCase } from 'packages/products-domain/src/application/use-cases/products/list-products/list-products.use-case';
import { Product } from 'packages/products-domain/src/domain/entities/product.entity';

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
      id: product.id,
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
    input: Partial<CreateProductInput> & { id: number },
  ): Promise<ProductResponse> {
    const updatedProduct = await this.updateProductUseCase.execute(input);
    return this.toDto(updatedProduct);
  }

  async deleteProduct(input: { id: number }): Promise<void> {
    await this.deleteProductUseCase.execute(input);
  }

  async getProduct(input: { id: number }): Promise<ProductResponse> {
    const getProduct = await this.getProductUseCase.execute(input);
    if (getProduct === null) throw new NotFoundException('Product Not Found');
    return this.toDto(getProduct);
  }

  async listProductsByCategory(categoryId: number): Promise<ProductResponse[]> {
    const productList = await this.listProductsUseCase.execute({ categoryId });
    return productList.map((product) => this.toDto(product));
  }

  async listProducts(input?: {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    page?: number;
    search?: string;
  }): Promise<ProductResponse[] | ProductPaginationResponse> {
    if (
      input?.minPrice !== undefined &&
      input?.maxPrice !== undefined &&
      input?.minPrice > input.maxPrice
    ) {
      throw new BadRequestException(
        'Min price must be less than or equal to max price',
      );
    }

    const products = await this.listProductsUseCase.execute({
      categoryId: input?.categoryId,
      search: input?.search,
      minPrice: input?.minPrice,
      maxPrice: input?.maxPrice,
    });

    if (input?.page || input?.limit) {
      const page = input.page ?? 1;
      const limit = input.limit ?? 5;
      const start = (page - 1) * limit;
      const data = products.slice(start, start + limit);

      return {
        data: data.map((product) => this.toDto(product)),
        meta: {
          total: products.length,
          page,
          limit,
          totalPages: Math.ceil(products.length / limit),
        },
      };
    }
    return products.map((product) => this.toDto(product));
  }
}
