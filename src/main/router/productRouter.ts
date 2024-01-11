import { Router, Express } from 'express'
import {
  ProductCreateController,
  ProductFindController,
  ProductFetchController,
  ProductRemoveController,
  ProductUpdateController,
} from '../../infra/controller/product'
import {
  ProductCreateService,
  ProductFindService,
  ProductFetchService,
  ProductRemoveService,
  ProductUpdateService,
} from '../../domain/product/useCase'
import { ProductRepository } from '../../infra/repository/product'
import { adaptExpressRoute as adapt } from '../adapter'

const productRepository = new ProductRepository()

const productCreateService = new ProductCreateService(productRepository)
const productFindService = new ProductFindService(productRepository)
const productFetchService = new ProductFetchService(productRepository)
const productRemoveService = new ProductRemoveService(productRepository)
const productUpdateService = new ProductUpdateService(productRepository, productRepository)

const productCreateController = new ProductCreateController(productCreateService)
const productFindController = new ProductFindController(productFindService)
const productFetchController = new ProductFetchController(productFetchService)
const productRemoveController = new ProductRemoveController(productRemoveService)
const productUpdateController = new ProductUpdateController(productUpdateService)

const router = Router()

export const productCreateRouter = (app: Express) => {
  router.post('/product', adapt(productCreateController))

  app.use('/api/v1/', router)
}

export const productFindRouter = (app: Express) => {
  router.get('/product/:sku', adapt(productFindController))

  app.use('/api/v1/', router)
}

export const productFetchRouter = (app: Express) => {
  router.get('/product/', adapt(productFetchController))

  app.use('/api/v1/', router)
}

export const productRemoveRouter = (app: Express) => {
  router.delete('/product/:sku', adapt(productRemoveController))

  app.use('/api/v1/', router)
}

export const productUpdateRouter = (app: Express) => {
  router.put('/product/:sku', adapt(productUpdateController))

  app.use('/api/v1/', router)
}
