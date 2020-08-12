import { Router } from 'express'

import UsersControllers from '../controller/UsersControllers'
import UsersAnswersController from '../controller/UsersAnswersController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()
const usersController = new UsersControllers()

usersRouter.post('/', usersController.create)
usersRouter.get('/', ensureAuthenticated, usersController.index)

const usersAnswersRouter = Router({ mergeParams: true })

const usersAnswersController = new UsersAnswersController()
usersAnswersRouter.post('/', usersAnswersController.create)
usersAnswersRouter.get('/', usersAnswersController.index)

usersRouter.use('/:user_id/answers', usersAnswersRouter)

export default usersRouter
