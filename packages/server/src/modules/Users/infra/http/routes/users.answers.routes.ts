import { Router } from 'express'

import UsersAnswersController from '../controller/UsersAnswersController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersAnswersRouter = Router()

usersAnswersRouter.use(ensureAuthenticated)

const usersAnswersController = new UsersAnswersController()
usersAnswersRouter.post('/:user_id/answers', usersAnswersController.create)
usersAnswersRouter.get('/:user_id/answers', usersAnswersController.index)

export default usersAnswersRouter
