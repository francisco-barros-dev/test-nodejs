import { Product } from '@/domain/product'
import type {
  IProductFetchRepository,
  IProductCreateRepository,
  IProductFindRepository,
  IProductUpdateRepository,
  IProductRemoveRepository,
} from '@/domain/product/repository'

export class ProductRepository implements
  IProductFetchRepository,
  IProductFindRepository,
  IProductCreateRepository,
  IProductUpdateRepository,
  IProductRemoveRepository
{
  private products: Product[] = []

  private handleSingleProduct(product: Product) : Product {
    product.isMarketable = false

    if (product?.inventory) {
      product.inventory.quantity = product.inventory.warehouses.reduce(
        (acc, currentProduct) => acc + currentProduct.quantity,
        0,
      )
    }

    product = {...product, ...this.handleMarketableProduct(product)}

    return product
  }

  private handleMarketableProduct(product: Product) : Product {
    const hasInventoryQuantity = product?.inventory?.quantity ?? 0

    if (hasInventoryQuantity && hasInventoryQuantity > 0) {
      product.isMarketable = true
    }
    return product
  }

  private handleProducts(products: Product[]) : Product[] {
    const formattedProducts: Product[] = []
    products.forEach(product => {
      formattedProducts.push(this.handleSingleProduct(product))
    })

    return formattedProducts
  }

  fetch(): Promise<Product[]> {
    return Promise.resolve(this.handleProducts(this.products))
  }

  find(sku: number): Promise<Product | undefined> {
    const foundProduct = this.products.find(product => {
      return product.sku == sku
    })

    if (foundProduct) {
      return Promise.resolve(this.handleSingleProduct(foundProduct))
    }

    return Promise.resolve(undefined)
  }

  create(input: Product): Promise<Product | undefined> {
    const productIndex = this.products.findIndex(product => product?.sku == input?.sku)

    if (productIndex == -1) {
      this.products.push(this.handleSingleProduct(input))
      return Promise.resolve(this.products[this.products?.length -1])
    }

    return Promise.resolve(undefined)
  }

  update(input: Product): Promise<Product> {
    const productIndex = this.products.findIndex(product => product?.sku == input?.sku)

    if (productIndex !== -1) {
      this.products[productIndex] = this.handleSingleProduct(input)
    }

    return Promise.resolve(this.products[productIndex])
  }

  remove(sku: number): Promise<Product> {
    const productIndex = this.products.findIndex(product => product?.sku == sku)

    if (productIndex !== -1) {
      const removedProduct = this.products[productIndex]
      this.products.splice(productIndex, 1)
      return Promise.resolve(removedProduct)
    }

    return Promise.resolve(this.products[productIndex])
  }

}
