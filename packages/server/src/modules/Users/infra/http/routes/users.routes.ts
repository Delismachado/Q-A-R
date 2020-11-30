import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import UsersControllers from '../controller/UsersControllers'
import UserParticipationsController from '../controller/UserParticipationsController'

const usersRouter = Router()
const usersController = new UsersControllers()

usersRouter.post('/', usersController.create)
usersRouter.get('/', ensureAuthenticated, usersController.index)

const usersParticipationsRouter = Router({ mergeParams: true })
usersParticipationsRouter.use(ensureAuthenticated)
const usersParticipationsController = new UserParticipationsController()
usersParticipationsRouter.get('/', usersParticipationsController.index)
usersRouter.use('/:user_id/participations', usersParticipationsRouter)

export default usersRouter
