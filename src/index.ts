import * as dotenv from 'dotenv'
dotenv.config()
import app from './app'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ?? 8000

app.listen(port as number,host, () => {
  console.log(`Server is up and running at ${host}:${port}`)
})
