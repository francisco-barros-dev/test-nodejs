import { Controller } from '../Controller'
import { HttpResponse, badRequest, serverError, unprocessableEntity, created } from '../../../domain/helper'
import { Product, ProductCreateService } from '@/domain/product'

type ProductOutput = Error | Product | undefined

export class ProductCreateController extends Controller {
  constructor(private readonly productCreateService: ProductCreateService) {
    super()
  }

  async handle(request: any): Promise<HttpResponse<ProductOutput>> {
    try {

      if (!request) {
        return badRequest(new Error('invalid parameters'))
      }

      const { sku, name } = request

      if (!sku || !name) return badRequest(new Error('invalid parameters, sku and name are required'))

      const product = await this.productCreateService.handle(request)

      if (!product) return unprocessableEntity(new Error('Error on Product creation, product already exists'))

      return created(product)
    } catch (error) {
      return serverError(new Error(`${error}`))
    }
  }
}
