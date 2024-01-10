import { Product } from '../Product'

describe('Product entity', () => {
  it('Should throw if required field is not provided', () => {
    const expectedError = new Error('"sku" is required')
    expect(() => new Product(
      {
        sku: undefined,
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
      },
    )).toThrow(expectedError)
  })
})
