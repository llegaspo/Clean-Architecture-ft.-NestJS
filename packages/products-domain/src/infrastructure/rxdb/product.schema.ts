import type { RxJsonSchema, RxDocument, RxCollection } from 'rxdb';

export type ProductDocType = {
  productId: string;
  name: string;
  price: number;
  stock: number;
  categoryId?: number;
};

export const productSchema: RxJsonSchema<ProductDocType> = {
  title: 'product schema',
  version: 0,
  primaryKey: 'productId',
  type: 'object',
  properties: {
    productId: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
    name: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    stock: {
      type: 'number',
    },
    categoryId: {
      type: 'number',
    },
  },
  required: ['productId', 'name', 'price', 'stock'],
  indexes: ['name', 'categoryId'],
};

export type ProductDocument = RxDocument<ProductDocType>;
export type ProductCollection = RxCollection<ProductDocType>;
