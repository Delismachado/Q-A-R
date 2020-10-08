import { Router } from 'express'

import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import RecomendationsController from '../controller/RecomendationController'

const recomendationsRouter = Router()
recomendationsRouter.use(ensureAuthenticated)
const recomendationsController = new RecomendationsController()

recomendationsRouter.get('/', recomendationsController.index)
recomendationsRouter.post('/', recomendationsController.create)
recomendationsRouter.get('/:recomendationId', recomendationsController.get)
recomendationsRouter.put('/:recomendationId', recomendationsController.update)
recomendationsRouter.delete(
  '/:recomendationId',
  recomendationsController.delete
)

export default recomendationsRouter
