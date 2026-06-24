import type { RxJsonSchema, RxDocument, RxCollection } from 'rxdb';

export type ProductDocType = {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
};

export const productSchema: RxJsonSchema<ProductDocType> = {
  title: 'product schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'number',
      minimum: 1,
      maximum: 1000000000000000,
      multipleOf: 1,
      maxLength: 16,
    },
    name: {
      type: 'string',
      maxLength: 100,
    },
    price: {
      type: 'number',
    },
    stock: {
      type: 'number',
    },
    categoryId: {
      type: 'number',
      minimum: 1,
      maximum: 1000000000000000,
      multipleOf: 1,
    },
  },
  required: ['id', 'name', 'price', 'stock'],
  indexes: ['name', 'id', 'categoryId'],
};

export type ProductDocument = RxDocument<ProductDocType>;
export type ProductCollection = RxCollection<ProductDocType>;
