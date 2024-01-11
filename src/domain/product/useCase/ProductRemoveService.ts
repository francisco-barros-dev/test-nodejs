import { Product } from '@/domain/product/entity'
import { IProductFindRepository, IProductRemoveRepository } from '@/domain/product/repository'

export interface IProductRemoveService {
  handle(sku: number): Promise<Product>
}

export class ProductRemoveService implements IProductRemoveService {
  constructor(
    private readonly productFindRepository: IProductFindRepository,
    private readonly productRemoveRepository: IProductRemoveRepository,
  ) { }

  async handle(sku: number): Promise<Product> {
    const existingProduct = await this.productFindRepository.find(sku)

    if (!existingProduct) {
      throw new Error('Product not found')
    }

    const output = await this.productRemoveRepository.remove(sku)
    return output
  }
}
