import { Product } from '@/domain/product/entity'
import { IProductFindRepository } from '@/domain/product/repository'

export interface IProductFindService {
  handle(sku: number): Promise<Product | undefined>
}

export class ProductFindService implements IProductFindService {
  constructor(
    private readonly productFindRepository: IProductFindRepository,
  ) { }

  async handle(sku: number): Promise<Product | undefined> {
    const product = await this.productFindRepository.find(sku)

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }
}
