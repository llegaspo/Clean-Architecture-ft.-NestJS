import { createRxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { productSchema } from './product.schema';
import { categorySchema } from './category.schema';
import type {
  ProductDatabaseCollection,
  ProductDatabase,
} from './database.type';

export const PRODUCT_DATABASE = Symbol();

export async function createProductDatabase(): Promise<ProductDatabase> {
  const db = await createRxDatabase<ProductDatabaseCollection>({
    name: 'ecom-products',
    storage: getRxStorageMemory(),
  });

  await db.addCollections({
    products: {
      schema: productSchema,
    },
    categories: {
      schema: categorySchema,
    },
  });

  return db;
}

export const productDatabaseProvider = {
  provide: PRODUCT_DATABASE,
  useFactory: createProductDatabase,
};
