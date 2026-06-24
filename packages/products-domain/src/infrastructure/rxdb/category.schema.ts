import { RxJsonSchema, RxCollection, RxDocument } from 'rxdb';

export type CategoryDocType = {
  id: number;
  name: string;
};

export const categorySchema: RxJsonSchema<CategoryDocType> = {
  title: 'category schema',
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
  },
  required: ['id', 'name'],
  indexes: ['id', 'name'],
};

export type CategoryDocument = RxDocument<CategoryDocType>;
export type CategoryCollection = RxCollection<CategoryDocType>;
