import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { randomUUID } from 'crypto';

@Controller('categories')
export class CategoriesController {
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return {
      id: crypto.randomUUID(),
      ...createCategoryDto,
    };
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return { id };
  }

  @Get()
  findAll(@Query('name') name: string) {
    return [{ name }];
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return updateCategoryDto;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
