import { Router } from 'express'

import QuestionsController from '../controller/QuestionsController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'

const questionsRouter = Router()
const questionsController = new QuestionsController()

questionsRouter.post('/', questionsController.create)
questionsRouter.get('/', questionsController.index)

export default questionsRouter
