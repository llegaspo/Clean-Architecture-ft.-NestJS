import {
  Controller,
  Get,
  Post,
  Query,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return {
      id: crypto.randomUUID(),
      ...createProductDto,
    };
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return { id };
  }

  @Get()
  findAll(
    @Query('price') price: number,
    @Query('stock') stock: number,
    @Query('categoryId') categoryId: number,
  ) {
    return [
      {
        price,
        stock,
        categoryId,
      },
    ];
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateProductDto: UpdateProductDto) {
    return {
      id,
      ...UpdateProductDto,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return {
      id,
    };
  }
}
