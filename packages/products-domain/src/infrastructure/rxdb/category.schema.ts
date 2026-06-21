import { RxJsonSchema, RxCollection, RxDocument } from 'rxdb';

export type CategoryDocType = {
  categoryId: number;
  name: string;
};

export const categorySchema: RxJsonSchema<CategoryDocType> = {
  title: 'category schema',
  version: 0,
  primaryKey: 'categoryId',
  type: 'object',
  properties: {
    categoryId: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
  },
  required: ['categoryId', 'name'],
  indexes: ['categoryId', 'name'],
};

export type CategoryDocument = RxDocument<CategoryDocType>;
export type CategoryCollection = RxCollection<CategoryDocType>;
