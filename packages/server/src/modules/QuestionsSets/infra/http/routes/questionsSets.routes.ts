import { Router } from 'express'

import QuestionsSetsController from '../controller/QuestionsSetsController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import QuestionsSetsQuestionsController from '../controller/QuestionsSetsQuestionsController'

const questionsSetsRouter = Router()
questionsSetsRouter.use(ensureAuthenticated)

const questionsSetsController = new QuestionsSetsController()

questionsSetsRouter.post('/', questionsSetsController.create)
questionsSetsRouter.get('/', questionsSetsController.index)
questionsSetsRouter.get('/:questionsSetId', questionsSetsController.get)

const questionsSetQuestionsController = new QuestionsSetsQuestionsController()

const questionsSetsQuestionsRouter = Router({ mergeParams: true })

questionsSetsRouter.use(
  '/:questionsSetId/questions',
  questionsSetsQuestionsRouter
)

questionsSetsQuestionsRouter.get('/', questionsSetQuestionsController.index)

export default questionsSetsRouter
