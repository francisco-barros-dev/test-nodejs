import { Product } from '@/domain/product'
import {
  ProductRepository,
} from '../../../repository/product'

const mockedProducts: Product[] = [
  {
    sku: 10,
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
  {
    sku: 11,
    name: 'Quasar perfume',
    inventory: {
      quantity: 25,
      warehouses: [
        {
          locality: 'RJ',
          quantity: 10,
          type: 'ECOMMERCE',
        },
        {
          locality: 'COPACABANA',
          quantity: 15,
          type: 'PHYSICAL_STORE',
        },
      ],
    },
    isMarketable: true,
  },
]

describe('ProductRepository', () => {
  let productRepository: ProductRepository

  beforeEach(() => {
    productRepository = new ProductRepository()
  })

  it('Should create and find product', async (): Promise<void> => {
    const createdProduct = await productRepository.create(mockedProducts[0])
    const foundProduct = await productRepository.find(createdProduct?.sku as number)
    expect(createdProduct).toBeDefined()
    expect(foundProduct).toBeDefined()
    expect(foundProduct?.sku).toBe(createdProduct?.sku)
    expect(foundProduct?.name).toBe(createdProduct?.name)
  })

  it('Should not create duplicated products', async (): Promise<void> => {
    await productRepository.create(mockedProducts[0])
    const createdProduct = await productRepository.create(mockedProducts[0])
    expect(createdProduct).toBeUndefined()
  })

  it('Should not find a no existing product', async (): Promise<void> => {
    const sku = 1000
    const foundProduct = await productRepository.find(sku)
    expect(foundProduct).toBeUndefined()
  })

  it('Should fetch products', async (): Promise<void> => {
    await productRepository.create(mockedProducts[0])
    await productRepository.create(mockedProducts[1])
    const fetchProducts = await productRepository.fetch()
    expect(fetchProducts?.length).toBe(2)
    expect(fetchProducts[0]).toStrictEqual(mockedProducts[0])
    expect(fetchProducts[1]).toStrictEqual(mockedProducts[1])
  })

  it('Should not fetch no existing products', async (): Promise<void> => {
    const fetchProducts = await productRepository.fetch()
    expect(fetchProducts?.length).toBe(0)
  })

  it('Should update an existing product', async (): Promise<void> => {
    const existingProduct = await productRepository.create(mockedProducts[0])

    const productToBeUpdated = new Product({
      ...existingProduct,
      name: 'new_name',
    } as Product, false)

    const updatedProduct = await productRepository.update(productToBeUpdated)
    expect(updatedProduct?.name).toBe(productToBeUpdated.name)
  })

  it('Should not update a no existing product', async (): Promise<void> => {

    const productToBeUpdated = new Product({
      sku: 99999,
      name: 'any_name',
    } as Product, false)

    const updatedProduct = await productRepository.update(productToBeUpdated)
    expect(updatedProduct).toBeUndefined()
  })

  it('Should remove an existing product', async (): Promise<void> => {
    const existingProduct = await productRepository.create(mockedProducts[0])
    await productRepository.remove(existingProduct?.sku as number)
    const foundProduct = await productRepository.find(existingProduct?.sku as number)
    expect(foundProduct).toBeUndefined()
  })

  it('Should not remove a no existing product', async (): Promise<void> => {
    const sku = 777
    await productRepository.remove(sku)
    const foundProduct = await productRepository.find(sku)
    expect(foundProduct).toBeUndefined()
  })
})
