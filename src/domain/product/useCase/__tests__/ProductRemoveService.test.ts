import {
  ProductRemoveService,
} from '@/domain/product/useCase'

import { type IProductRemoveRepository, type IProductFindRepository } from '@/domain/product/repository'

let productRemoveRepository: IProductRemoveRepository
let productFindRepository: IProductFindRepository

const mockedProduct = {
  sku: 1234,
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

beforeEach(() => {
  productFindRepository = {
    find: jest.fn().mockResolvedValue(mockedProduct),
  },
  productRemoveRepository = {
    remove: jest.fn().mockResolvedValue(mockedProduct),
  }
})

const makeService = () => {
  return new ProductRemoveService(productFindRepository, productRemoveRepository)
}

const input = 1234

describe('ProductRemoveService:handle', () => {
  it('Should call ProductFindRepository and ProductRemoveRepository', async (): Promise<void> => {
    const findSpy = jest.spyOn(productFindRepository, 'find')
    const removeSpy = jest.spyOn(productRemoveRepository, 'remove')
    const service = makeService()
    await service.handle(input)

    expect(findSpy).toHaveBeenCalledTimes(1)
    expect(removeSpy).toHaveBeenCalledTimes(1)
    expect(findSpy).toHaveBeenCalledWith(input)
    expect(removeSpy).toHaveBeenCalledWith(input)
  })

  it('Should return a Product on success', async (): Promise<void> => {
    const service = makeService()
    const output = await service.handle(input)

    expect(output).toStrictEqual(mockedProduct)
  })

  it('should throw if a product does not exist on removal', async (): Promise<void> => {
    jest.spyOn(productFindRepository, 'find').mockResolvedValue(undefined)
    const service = makeService()
    const expectedError = new Error('Product not found')

    await expect(service.handle(input))
      .rejects
      .toThrow(expectedError)
  })
})
