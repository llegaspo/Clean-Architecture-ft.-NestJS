export class CreateProductDto {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

export type CreateProductDtoType = CreateProductDto;
