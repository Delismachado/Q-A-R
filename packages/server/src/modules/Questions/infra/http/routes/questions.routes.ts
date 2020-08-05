import { Router } from 'express'

import QuestionsController from '../controller/QuestionsController'

const questionsRouter = Router()
const questionsController = new QuestionsController()

questionsRouter.post('/', questionsController.create)

export default questionsRouter
