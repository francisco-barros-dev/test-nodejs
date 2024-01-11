import { Product } from '@/domain/product/entity'
import { IProductCreateRepository } from '@/domain/product/repository'

export interface IProductCreateService {
  handle(input: Record<string, unknown>): Promise<Product>
}

export class ProductCreateService implements IProductCreateService {
  constructor(
    private readonly productCreateRepository: IProductCreateRepository,
  ) { }

  async handle(input: Record<string, unknown>): Promise<Product> {
    const product = new Product(input as Product)
    const output = await this.productCreateRepository.create(product)
    return output
  }
}
