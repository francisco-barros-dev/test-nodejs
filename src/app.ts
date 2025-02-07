import express from 'express'
import { urlencoded } from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import {
  productCreateRouter,
  productFindRouter,
  productFetchRouter,
  productRemoveRouter,
  productUpdateRouter,
} from './main/router'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(urlencoded({ extended: false }))
app.use(helmet())

productCreateRouter(app)
productFindRouter(app)
productFetchRouter(app)
productRemoveRouter(app)
productUpdateRouter(app)

export default app
