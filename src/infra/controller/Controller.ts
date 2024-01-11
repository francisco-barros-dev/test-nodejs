import { HttpResponse } from '../../domain/helper'

export abstract class Controller {
  abstract handle(httpRequest: unknown): Promise<HttpResponse<unknown>>
}
