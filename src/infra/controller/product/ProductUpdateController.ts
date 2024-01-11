import { Controller } from '../Controller'
import { HttpResponse, badRequest, serverError, noContent, notFound } from '../../../domain/helper'
import { Product, ProductUpdateService} from '@/domain/product'

type ProductOutput = Error | Product | undefined

export class ProductUpdateController extends Controller {
  constructor(private readonly productUpdateService: ProductUpdateService) {
    super()
  }

  async handle(request: any): Promise<HttpResponse<ProductOutput>> {
    try {

      if (!request) {
        return badRequest(new Error('invalid parameters'))
      }

      const { sku, ...input } = request

      if (isNaN(sku)) return badRequest(new Error('sku is obligatory and must be a number'))

      if (!input) return badRequest(new Error('Fields to be updated is required on request body'))

      const product = await this.productUpdateService.handle(sku, input)

      if (!product) return notFound(new Error('Product not found'))

      return noContent(product)
    } catch (error) {
      return serverError(new Error(`${error}`))
    }
  }
}


