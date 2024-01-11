import { Product } from '@/domain/product/entity'
import { IProductFindRepository, IProductUpdateRepository } from '@/domain/product/repository'

export interface IProductUpdateService {
  handle(sku: number, input: Record<string, unknown>): Promise<Product>
}

export class ProductUpdateService implements IProductUpdateService {
  constructor(
    private readonly productFindRepository: IProductFindRepository,
    private readonly productUpdateRepository: IProductUpdateRepository,
  ) { }

  async handle(sku: number, input: Record<string, unknown>): Promise<Product> {
    const existingProduct = await this.productFindRepository.find(sku)

    if (!existingProduct) {
      throw new Error('Product not found')
    }

    const product = new Product({
      ...existingProduct,
      ...input,
      sku,
    } as Product, false)

    const output = await this.productUpdateRepository.update(product)
    return output
  }
}
