import { IUseCase } from '../../../interfaces/use-case.interface';
import { IProductRepository } from '../../../interfaces/product-repository.interface';

export class DeleteProductUseCase implements IUseCase<{ id: string }, void> {
  constructor(private readonly productRepository: IProductRepository) {}
  async execute(input: { id: string }): Promise<void> {
    return await this.productRepository.delete(input.id);
  }
}
