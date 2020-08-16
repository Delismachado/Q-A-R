import 'reflect-metadata'
import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import cors from 'cors'
import AppError from '../../errors/AppError'
import routes from './routes'
import '../../container'

import '../typeorm'

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }

    console.log(err)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

app.listen(3333, () => {
  console.log('Server running')
})
