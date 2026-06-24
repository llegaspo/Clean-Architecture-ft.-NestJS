import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Param,
  Query,
  Delete,
  ParseIntPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiKeyGuard } from '../api-key.guard';
import { ProductApplicationService } from '../../application/services/product-application.service';
import {
  ProductResponse,
  type ProductPaginationResponse,
} from '../../application/dto/product-response.dto';
import {
  type CreateProductSchema,
  createProductSchema,
  type UpdateProductSchema,
  updateProductSchema,
} from '../../application/dto/product-input.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductApplicationService) {}

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponse> {
    const prodData = await this.productService.getProduct({ id: id });
    return prodData;
  }

  @Get()
  async findAll(
    @Query('categoryId', new ParseIntPipe({ optional: true }))
    categoryId?: number,
    @Query('minPrice', new ParseIntPipe({ optional: true })) minPrice?: number,
    @Query('maxPrice', new ParseIntPipe({ optional: true })) maxPrice?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('search') search?: string,
  ): Promise<ProductResponse[] | ProductPaginationResponse> {
    return await this.productService.listProducts({
      categoryId,
      minPrice,
      maxPrice,
      limit,
      page,
      search,
    });
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  async create(
    @Body(new ZodValidationPipe(createProductSchema))
    productData: CreateProductSchema,
  ): Promise<ProductResponse> {
    return await this.productService.createProduct({
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
      categoryId: productData.categoryId ?? undefined,
    });
  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(createProductSchema))
    input: CreateProductSchema,
  ): Promise<ProductResponse> {
    return await this.productService.updateProduct({
      id: id,
      name: input.name,
      price: input.price,
      stock: input.stock,
      categoryId: input.categoryId ?? undefined,
    });
  }
  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateProductSchema))
    input: UpdateProductSchema,
  ): Promise<ProductResponse> {
    return await this.productService.updateProduct({
      id: id,
      name: input?.name,
      price: input?.price,
      stock: input?.stock,
      categoryId: input?.categoryId,
    });
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productService.deleteProduct({ id: id });
  }
}
