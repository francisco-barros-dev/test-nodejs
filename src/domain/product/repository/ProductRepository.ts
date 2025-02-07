import { Product } from '../entity'

export interface IProductFetchRepository {
  fetch(): Promise<Product[]>
}

export interface IProductFindRepository {
  find(sku: number): Promise<Product | undefined>
}

export interface IProductCreateRepository {
  create(input: Product): Promise<Product | undefined>
}

export interface IProductUpdateRepository {
  update(input: Product): Promise<Product>
}

export interface IProductRemoveRepository {
  remove(sku: number): Promise<Product>
}
