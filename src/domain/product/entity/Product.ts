import Joi from 'joi'

export type Warehouse = {
  locality: string
  quantity: number
  type: 'ECOMMERCE' | 'PHYSICAL_STORE'
}

export type Inventory = {
  quantity: number
  warehouses: Warehouse[]
}

export class Product {

  private static readonly schema = Joi.object({
    sku: Joi.number().min(1).required(),
    name: Joi.string().required(),
    isMarketable: Joi.boolean(),
    inventory: Joi.object({
      quantity: Joi.number().required(),
      warehouses: Joi.array().items(
        Joi.object({
          locality: Joi.string().required(),
          quantity: Joi.number().required(),
          type: Joi.string().required().valid('ECOMMERCE', 'PHYSICAL_STORE'),
        }),
      ),
    }),
  })

  sku?: number
  name?: string
  inventory?: Inventory
  isMarketable?: boolean

  constructor(input: Product, validate = true) {

    if (validate) {
      const schema = Product.schema

      const result = schema.validate(input)

      if (result.error) {
        throw new Error(result.error.message)
      }
    }

    Object.assign(this, input)
  }
}
