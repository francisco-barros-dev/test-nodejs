import { Controller } from '../Controller'
import { HttpResponse, badRequest, serverError, noContent, notFound } from '../../../domain/helper'
import { Product, ProductRemoveService} from '@/domain/product'

type ProductOutput = Error | Product | undefined

export class ProductRemoveController extends Controller {
  constructor(private readonly productRemoveService: ProductRemoveService) {
    super()
  }

  async handle(request: any): Promise<HttpResponse<ProductOutput>> {
    try {

      if (!request) {
        return badRequest(new Error('invalid parameters'))
      }

      const { sku } = request

      if (isNaN(sku)) return badRequest(new Error('sku is obligatory and must be a number'))

      const product = await this.productRemoveService.handle(sku)

      if (!product) return notFound(new Error('Product not found for deletion'))

      return noContent(product)
    } catch (error) {
      return serverError(new Error(`${error}`))
    }
  }
}


