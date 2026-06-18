import { Injectable } from '@nestjs/common';
import type {
  CreateProductDto,
  CreateProductDtoType,
} from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: ({ id: string } & CreateProductDto)[];
}
