import { Controller } from '../Controller'
import { HttpResponse, serverError, ok, notFound } from '../../../domain/helper'
import { Product, ProductFetchService} from '@/domain/product'

type ProductOutput = Error | Product[] | undefined

export class ProductFetchController extends Controller {
  constructor(private readonly productFetchService: ProductFetchService) {
    super()
  }

  async handle(_: any): Promise<HttpResponse<ProductOutput>> {
    try {

      const products = await this.productFetchService.handle()

      if (products?.length == 0) return notFound(new Error('Products not found'))

      return ok(products)
    } catch (error) {
      return serverError(new Error(`${error}`))
    }
  }
}


