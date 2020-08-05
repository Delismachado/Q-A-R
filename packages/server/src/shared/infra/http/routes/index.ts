import express from 'express'
import usersRouter from '../../../../modules/Users/infra/http/routes/users.routes'
import questionsRouter from '../../../../modules/Questions/infra/http/routes/questions.routes'

const routes = express.Router()

routes.use('/users', usersRouter)
routes.use('/questions', questionsRouter)

export default routes
