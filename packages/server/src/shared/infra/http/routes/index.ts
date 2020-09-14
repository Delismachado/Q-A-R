import express from 'express'
import usersRouter from '@modules/Users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/Users/infra/http/routes/sessions.routes'
import questionsRouter from '@modules/Questions/infra/http/routes/questions.routes'
import rulesRouter from '@modules/Rules/infra/http/routes/rules.routes'
// import passwordRouter from '@modules/users/infra/http/routes/password.routes'

const routes = express.Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/questions', questionsRouter)
routes.use('/rules', rulesRouter)
// routes.use('/password', passwordRouter)

export default routes
