import { Router } from 'express'

import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import ParticipationsController from '../controller/ParticipationsController'

const participationsRouter = Router()
participationsRouter.use(ensureAuthenticated)
const participationsController = new ParticipationsController()

participationsRouter.get('/', participationsController.index)
participationsRouter.post('/', participationsController.create)
participationsRouter.get('/:participationsId', participationsController.get)
participationsRouter.put('/:participationsId', participationsController.update)
participationsRouter.delete(
  '/:participationsId',
  participationsController.delete
)

export default participationsRouter
