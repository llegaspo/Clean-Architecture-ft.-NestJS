import { RxDatabase } from 'rxdb';
import { ProductCollection } from './product.schema';
import { CategoryCollection } from './category.schema';

export type ProductDatabaseCollection = {
  products: ProductCollection;
  categories: CategoryCollection;
};

export type ProductDatabase = RxDatabase<ProductDatabaseCollection>;
