import { Router } from 'express'

import RulesController from '../controller/RulesController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'

const rulesRouter = Router()
rulesRouter.use(ensureAuthenticated)

const rulesController = new RulesController()

rulesRouter.post('/', rulesController.create)
rulesRouter.get('/', rulesController.index)
rulesRouter.get('/:rule_id', rulesController.get)

export default rulesRouter
