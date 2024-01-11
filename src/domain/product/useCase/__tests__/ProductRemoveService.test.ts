import {
  ProductRemoveService,
} from '../ProductRemoveService'

import { type IProductRemoveRepository } from '@/domain/product/repository'

let productRemoveRepository: IProductRemoveRepository

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
  productRemoveRepository = {
    remove: jest.fn().mockResolvedValue(mockedProduct),
  }
})

const makeService = () => {
  return new ProductRemoveService(productRemoveRepository)
}

const input = 1234

describe('ProductRemoveService:handle', () => {
  it('Should call ProductRemoveRepository', async (): Promise<void> => {
    const removeSpy = jest.spyOn(productRemoveRepository, 'remove')
    const service = makeService()
    await service.handle(input)

    expect(removeSpy).toHaveBeenCalledTimes(1)
    expect(removeSpy).toHaveBeenCalledWith(input)
  })

  it('Should return a Product on success', async (): Promise<void> => {
    const service = makeService()
    const output = await service.handle(input)

    expect(output).toStrictEqual(mockedProduct)
  })
})
