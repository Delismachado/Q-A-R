import { Router } from 'express'

import QuestionsController from '../controller/QuestionsController'
import QuestionsAnswersController from '../controller/QuestionsAnswersController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'

const questionsRouter = Router()
questionsRouter.use(ensureAuthenticated)

const questionsController = new QuestionsController()

questionsRouter.post('/', questionsController.create)
questionsRouter.get('/', questionsController.index)
questionsRouter.get('/:question_id', questionsController.get)

const questionsAnswersRouter = Router({ mergeParams: true })
const questionsAnswersController = new QuestionsAnswersController()

questionsAnswersRouter.get('/', questionsAnswersController.index)

questionsRouter.use('/:question_id/answers', questionsAnswersRouter)

export default questionsRouter
