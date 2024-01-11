import {
  ProductUpdateService,
} from '../ProductUpdateService'

import { type IProductUpdateRepository, type IProductFindRepository } from '@/domain/product/repository'

let productUpdateRepository: IProductUpdateRepository
let productFindRepository: IProductFindRepository

const sku = 1234
const productUpdateFields = {
  name: 'new_name',
}

const mockedProduct = {
  sku,
  name: 'L Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g',
  inventory: {
    quantity: 15,
    warehouses: [
      {
        locality: 'SP',
        quantity: 12,
        type: 'ECOMMERCE',
      },
      {
        locality: 'MOEMA',
        quantity: 3,
        type: 'PHYSICAL_STORE',
      },
    ],
  },
  isMarketable: true,
}

const mockedUpdatedProduct = {...mockedProduct, name: productUpdateFields.name}

beforeEach(() => {
  productFindRepository = {
    find: jest.fn().mockResolvedValue(mockedProduct),
  },
  productUpdateRepository = {
    update: jest.fn().mockResolvedValue(mockedUpdatedProduct),
  }
})

const makeService = () => {
  return new ProductUpdateService(productFindRepository, productUpdateRepository)
}


describe('ProductUpdateService:handle', () => {
  it('Should call ProductFindRepository and productUpdateRepository', async (): Promise<void> => {
    const findSpy = jest.spyOn(productFindRepository, 'find')
    const updateSpy = jest.spyOn(productUpdateRepository, 'update')
    const service = makeService()
    await service.handle(sku, productUpdateFields)

    expect(findSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(findSpy).toHaveBeenCalledWith(sku)
    expect(updateSpy).toHaveBeenCalledWith(mockedUpdatedProduct)
  })

  it('Should return a Product with field updated on success', async (): Promise<void> => {
    const service = makeService()
    const output = await service.handle(sku, productUpdateFields)

    expect(output).toStrictEqual(mockedUpdatedProduct)
  })

  it('should throw if a product does not exist on update', async (): Promise<void> => {
    jest.spyOn(productFindRepository, 'find').mockResolvedValue(undefined)
    const service = makeService()
    const expectedError = new Error('Product not found')

    await expect(service.handle(sku, productUpdateFields))
      .rejects
      .toThrow(expectedError)
  })
})
