import { Router } from 'express'

import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import FactsController from '../controller/FactsController'

const factsRouter = Router()
factsRouter.use(ensureAuthenticated)
const factsController = new FactsController()

factsRouter.get('/', factsController.index)
factsRouter.post('/', factsController.create)
factsRouter.get('/:factId', factsController.get)
factsRouter.put('/:factId', factsController.update)
factsRouter.delete('/:factId', factsController.delete)

export default factsRouter
