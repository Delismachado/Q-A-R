import { Router } from 'express'

import UsersControllers from '../controller/UsersControllers'

const usersRouter = Router()
const usersController = new UsersControllers()

usersRouter.post('/', usersController.create)
usersRouter.get('/', usersController.index)

export default usersRouter
