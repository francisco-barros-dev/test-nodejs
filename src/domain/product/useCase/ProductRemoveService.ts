import { Product } from '../entity'
import { IProductRemoveRepository } from '@/domain/product/repository'

export interface IProductRemoveService {
  handle(sku: number): Promise<Product>
}

export class ProductRemoveService implements IProductRemoveService {
  constructor(
    private readonly productRemoveRepository: IProductRemoveRepository,
  ) { }

  async handle(sku: number): Promise<Product> {
    const output = await this.productRemoveRepository.remove(sku)
    return output
  }
}
