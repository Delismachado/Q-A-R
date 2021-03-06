import { Router } from 'express'

import AnswersController from '../controller/AnswersController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'

const answersRouter = Router()
answersRouter.use(ensureAuthenticated)
const answersController = new AnswersController()

answersRouter.get('/', answersController.index)
answersRouter.post('/', answersController.create)
answersRouter.get('/user/:user_id', answersController.indexByUser)

export default answersRouter
