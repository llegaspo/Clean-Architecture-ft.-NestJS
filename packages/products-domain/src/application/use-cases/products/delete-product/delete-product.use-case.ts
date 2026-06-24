import { IUseCase } from '../../../interfaces/use-case.interface';
import { IProductRepository } from '../../../interfaces/product-repository.interface';

export class DeleteProductUseCase implements IUseCase<{ id: number }, void> {
  constructor(private readonly productRepository: IProductRepository) {}
  async execute(input: { id: number }): Promise<void> {
    return await this.productRepository.delete(input.id);
  }
}
