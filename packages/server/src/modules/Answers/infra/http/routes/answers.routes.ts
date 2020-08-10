import { Router } from 'express'

import AnswersController from '../controller/AnswersController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'

const answersRouter = Router()
answersRouter.use(ensureAuthenticated)
const answersController = new AnswersController()

answersRouter.post('/', answersController.create)
answersRouter.get('/', answersController.index)
answersRouter.get('/user/:user_id', answersController.indexByUser)

export default answersRouter
