import { Module } from '@nestjs/common';
import { ProductApplicationService } from '../src/application/services/product-application.service';
import { CategoryApplicationService } from '../src/application/services/category-application.service';
import { ProductController } from './presentation/controller/product.controller';
import { CategoryController } from './presentation/controller/category.controller';
import { IProductRepository } from 'packages/products-domain/src/application/interfaces/product-repository.interface';
import { RxdbProductRepository } from 'packages/products-domain/src/infrastructure/repositories/rxdb-product.repository';
import { ICategoryRepository } from 'packages/products-domain/src/application/interfaces/category-repository.interface';
import { RxdbCategoryRepository } from 'packages/products-domain/src/infrastructure/repositories/rxdb-category.repository';
import { productDatabaseProvider } from 'packages/products-domain/src/infrastructure/rxdb/database.provider';
import { CreateProductUseCase } from 'packages/products-domain/src/application/use-cases/products/create-product/create-product.use-case';
import { DeleteProductUseCase } from 'packages/products-domain/src/application/use-cases/products/delete-product/delete-product.use-case';
import { GetProductUseCase } from 'packages/products-domain/src/application/use-cases/products/get-product/get-product.use-case';
import { UpdateProductUseCase } from 'packages/products-domain/src/application/use-cases/products/update-product/update-product.use-case';
import { ListProductsUseCase } from 'packages/products-domain/src/application/use-cases/products/list-products/list-products.use-case';
import { CreateCategoryUseCase } from 'packages/products-domain/src/application/use-cases/category/create-category/create-category.use-case';
import { UpdateCategoryUseCase } from 'packages/products-domain/src/application/use-cases/category/update-category/update-category.use-case';
import { DeleteCategoryUseCase } from 'packages/products-domain/src/application/use-cases/category/delete-category/delete-category.use-case';
import { GetCategoryUseCase } from 'packages/products-domain/src/application/use-cases/category/get-category/get-category.use-case';
import { ListCategoriesUseCase } from 'packages/products-domain/src/application/use-cases/category/list-categories/list-categories.use-case';

@Module({
  controllers: [ProductController, CategoryController],
  providers: [
    productDatabaseProvider,
    ProductApplicationService,
    CategoryApplicationService,
    {
      provide: IProductRepository,
      useClass: RxdbProductRepository,
    },
    {
      provide: ICategoryRepository,
      useClass: RxdbCategoryRepository,
    },
    {
      provide: CreateProductUseCase,
      useFactory: (
        productRepo: IProductRepository,
        categoryRepo: ICategoryRepository,
      ) => new CreateProductUseCase(productRepo, categoryRepo),
      inject: [IProductRepository, ICategoryRepository],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (repo: IProductRepository) => new UpdateProductUseCase(repo),
      inject: [IProductRepository],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (repo: IProductRepository) => new DeleteProductUseCase(repo),
      inject: [IProductRepository],
    },
    {
      provide: ListProductsUseCase,
      useFactory: (repo: IProductRepository) => new ListProductsUseCase(repo),
      inject: [IProductRepository],
    },
    {
      provide: GetProductUseCase,
      useFactory: (repo: IProductRepository) => new GetProductUseCase(repo),
      inject: [IProductRepository],
    },
    {
      provide: CreateCategoryUseCase,
      useFactory: (repo: ICategoryRepository) =>
        new CreateCategoryUseCase(repo),
      inject: [ICategoryRepository],
    },
    {
      provide: UpdateCategoryUseCase,
      useFactory: (repo: ICategoryRepository) =>
        new UpdateCategoryUseCase(repo),
      inject: [ICategoryRepository],
    },
    {
      provide: DeleteCategoryUseCase,
      useFactory: (
        categoryRepo: ICategoryRepository,
        productRepo: IProductRepository,
      ) => new DeleteCategoryUseCase(categoryRepo, productRepo),
      inject: [ICategoryRepository, IProductRepository],
    },
    {
      provide: GetCategoryUseCase,
      useFactory: (repo: ICategoryRepository) => new GetCategoryUseCase(repo),
      inject: [ICategoryRepository],
    },
    {
      provide: ListCategoriesUseCase,
      useFactory: (repo: ICategoryRepository) =>
        new ListCategoriesUseCase(repo),
      inject: [ICategoryRepository],
    },
  ],
})
export class ProductsApiModule {}
