import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import UsersControllers from '../controller/UsersControllers'
import UsersAnswersController from '../controller/UsersAnswersController'
import UserParticipationsController from '../controller/UserParticipationsController'

const usersRouter = Router()
const usersController = new UsersControllers()

usersRouter.post('/', usersController.create)
usersRouter.get('/', ensureAuthenticated, usersController.index)

const usersAnswersRouter = Router({ mergeParams: true })
usersAnswersRouter.use(ensureAuthenticated)
const usersAnswersController = new UsersAnswersController()
usersAnswersRouter.post('/', usersAnswersController.create)
usersAnswersRouter.get('/', usersAnswersController.index)
usersRouter.use('/:user_id/answers', usersAnswersRouter)

const usersParticipationsRouter = Router({ mergeParams: true })
usersParticipationsRouter.use(ensureAuthenticated)
const usersParticipationsController = new UserParticipationsController()
usersParticipationsRouter.get('/', usersParticipationsController.index)
usersRouter.use('/:user_id/participations', usersParticipationsRouter)

export default usersRouter
