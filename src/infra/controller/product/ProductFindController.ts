import { Controller } from '../Controller'
import { HttpResponse, badRequest, serverError, ok, notFound } from '../../../domain/helper'
import { Product, ProductFindService} from '@/domain/product'

type ProductOutput = Error | Product | undefined

export class ProductFindController extends Controller {
  constructor(private readonly productFindService: ProductFindService) {
    super()
  }

  async handle(request: any): Promise<HttpResponse<ProductOutput>> {
    try {

      if (!request) {
        return badRequest(new Error('invalid parameters'))
      }

      const { sku } = request

      if (isNaN(sku)) return badRequest(new Error('sku is obligatory and must be a number'))

      const product = await this.productFindService.handle(sku)

      if (!product) return notFound(new Error('Product not found'))

      return ok(product)
    } catch (error) {
      return serverError(new Error(`${error}`))
    }
  }
}


