import express from 'express'
import usersRouter from '@modules/Users/infra/http/routes/users.routes'
import sessionsRouter from '@modules/Users/infra/http/routes/sessions.routes'
import questionsRouter from '@modules/Questions/infra/http/routes/questions.routes'
import rulesRouter from '@modules/Rules/infra/http/routes/rules.routes'
import projectsRouter from '@modules/Projects/infra/http/routes/projects.routes'
import recommendationsRouter from '@modules/Recommendations/infra/http/routes/recommendations.routes'
import participationsRouter from '@modules/Participations/infra/http/routes/participations.routes'
import factsRouter from '@modules/Facts/infra/http/routes/facts.routes'

const routes = express.Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/questions', questionsRouter)
routes.use('/rules', rulesRouter)
routes.use('/projects', projectsRouter)
routes.use('/recommendations', recommendationsRouter)
routes.use('/participations', participationsRouter)
routes.use('/facts', factsRouter)

export default routes
