import {
  ProductCreateService,
} from '../ProductCreateService'

import { type IProductCreateRepository } from '@/domain/product/repository'
import { Product } from '../../entity'

let productCreateRepository: IProductCreateRepository

const input = {
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

const product = new Product(input as Product)

beforeEach(() => {
  productCreateRepository = {
    create: jest.fn().mockResolvedValue(product),
  }
})

const makeService = () => {
  return new ProductCreateService(productCreateRepository)
}

describe('ProductCreateService:handle', () => {
  it('Should call ProductCreateService', async (): Promise<void> => {
    const createSpy = jest.spyOn(productCreateRepository, 'create')
    const service = makeService()
    await service.handle(input)

    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledWith(input)
  })

  it('Should return a product on success', async (): Promise<void> => {
    const service = makeService()
    const output = await service.handle(input)

    expect(output).toStrictEqual(product)
  })

  it('should throw if an invalid input is provided on product creation', async (): Promise<void> => {
    const service = makeService()
    const expectedError = new Error('"sku" is required')
    const invalidInput = {
      sku: undefined,
      name: 'any_name',
    }

    await expect(service.handle(invalidInput))
      .rejects
      .toThrow(expectedError)
  })
})
