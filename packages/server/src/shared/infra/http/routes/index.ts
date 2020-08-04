import express from 'express'
import usersRouter from '../../../../modules/Users/infra/http/routes/users.routes'

const routes = express.Router()

routes.use('/users', usersRouter)

export default routes
