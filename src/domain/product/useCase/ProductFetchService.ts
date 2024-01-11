import { Product } from '@/domain/product/entity'
import { IProductFetchRepository } from '@/domain/product/repository'

export interface IProductFetchService {
  handle(): Promise<Product[]>
}

export class ProductFetchService implements IProductFetchService {
  constructor(
    private readonly productFetchRepository: IProductFetchRepository,
  ) { }

  async handle(): Promise<Product[]> {
    const output = await this.productFetchRepository.fetch()

    return output
  }
}
