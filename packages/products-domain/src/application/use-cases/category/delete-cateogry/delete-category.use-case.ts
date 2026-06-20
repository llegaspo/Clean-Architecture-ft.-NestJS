import { IUseCase } from '../../../interfaces/use-case.interface';
import { ICategoryRepository } from '../../../interfaces/category-repository.interface';
import { IProductRepository } from '../../../interfaces/product-repository.interface';

export class DeleteCategoryUseCase implements IUseCase<{ id: number }, void> {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(input: { id: number }): Promise<void> {
    const toBeDeleted = await this.categoryRepository.findById(input.id);

    if (!toBeDeleted) throw new Error('Cannot non-existent Category');

    const assignedProducts = await this.productRepository.findByCategoryId(
      input.id,
    );

    const hasAssignedProducts: boolean =
      assignedProducts !== null && assignedProducts.length > 0;

    toBeDeleted.delete({
      hasAssignedProducts,
    });

    await this.categoryRepository.delete(input.id);
  }
}
