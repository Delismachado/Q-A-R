import { Router } from 'express'

import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import RecommendationsController from '../controller/RecommendationController'

const recommendationsRouter = Router()
recommendationsRouter.use(ensureAuthenticated)
const recommendationsController = new RecommendationsController()

recommendationsRouter.get('/', recommendationsController.index)
recommendationsRouter.post('/', recommendationsController.create)
recommendationsRouter.get('/:recommendationId', recommendationsController.get)
recommendationsRouter.put('/:recommendationId', recommendationsController.update)
recommendationsRouter.delete(
  '/:recommendationId',
  recommendationsController.delete
)

export default recommendationsRouter
