import express from 'express'
import usersRouter from '../../../../modules/Users/infra/http/routes/users.routes'
import sessionsRouter from '../../../../modules/Users/infra/http/routes/sessions.routes'
import questionsRouter from '../../../../modules/Questions/infra/http/routes/questions.routes'
import answersRouter from '@modules/Answers/infra/http/routes/answers.routes'

const routes = express.Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

routes.use('/questions', questionsRouter)

routes.use('/answers', answersRouter)

export default routes
