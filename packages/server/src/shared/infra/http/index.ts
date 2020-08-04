import 'reflect-metadata'
import express, { json } from 'express'
import cors from 'cors'
import routes from './routes'
import '../../container'

import '../typeorm'

const app = express()

app.use(json())
app.use(cors())
app.use(routes)

app.listen(3333, () => {
  console.log('Server running')
})
