import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiKeyGuard } from '../api-key.guard';
import { CategoryApplicationService } from '../../application/services/category-application.service';
import { CategoryResponse } from '../../application/dto/category-response.dto';
import { ProductApplicationService } from '../../application/services/product-application.service';
import { ProductResponse } from '../../application/dto/product-response.dto';
import {
  type CreateCategorySchema,
  createCategorySchema,
  type UpdateCategorySchema,
  updateCategorySchema,
} from '../../application/dto/category-create.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryApplicationService,
    private readonly productService: ProductApplicationService,
  ) {}

  @Get(':id/products')
  async findProducts(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponse[]> {
    const category = await this.categoryService.getCategory({ id });

    if (!category) {
      return [];
    }
    return await this.productService.listProductsByCategory(id);
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryResponse> {
    const categoryData = await this.categoryService.getCategory({ id: id });
    return categoryData;
  }

  @Get()
  async findAll(): Promise<CategoryResponse[]> {
    return await this.categoryService.listCategories();
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  async create(
    @Body(new ZodValidationPipe(createCategorySchema))
    categoryData: CreateCategorySchema,
  ): Promise<CategoryResponse> {
    return await this.categoryService.createcategory({
      name: categoryData.name,
    });
  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateCategorySchema))
    input: UpdateCategorySchema,
  ): Promise<CategoryResponse> {
    return await this.categoryService.updateCategory({
      id,
      name: input.name,
    });
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.categoryService.deleteCategory({ id: id });
  }
}
