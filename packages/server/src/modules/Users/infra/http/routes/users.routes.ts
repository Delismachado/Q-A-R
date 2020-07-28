import { Router } from 'express'

import UsersController from '../controller/UsersControllers'

const usersRouter = Router()
const usersController = new usersController()

usersRouter.post('/', usersController.create)

export default usersRouter;