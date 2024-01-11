import {
  ProductFetchService,
} from '@/domain/product/useCase'

import { type IProductFetchRepository } from '@/domain/product/repository'

let productFetchRepository: IProductFetchRepository

const mockedProducts = [{
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
}]

beforeEach(() => {
  productFetchRepository = {
    fetch: jest.fn().mockResolvedValue(mockedProducts),
  }
})

const makeService = () => {
  return new ProductFetchService(productFetchRepository)
}

describe('ProductFetchService:handle', () => {
  it('Should call ProductFetchService', async (): Promise<void> => {
    const fetchSpy = jest.spyOn(productFetchRepository, 'fetch')
    const service = makeService()
    await service.handle()

    expect(fetchSpy).toHaveBeenCalledTimes(1)
  })

  it('Should return products on success', async (): Promise<void> => {
    const service = makeService()
    const output = await service.handle()

    expect(output).toStrictEqual(mockedProducts)
  })
})
