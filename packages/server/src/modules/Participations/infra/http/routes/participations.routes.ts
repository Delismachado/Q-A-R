import { Router } from 'express'

import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import ParticipationsController from '../controller/ParticipationsController'
import NextQuestionController from '../controller/NextQuestionsController'

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

const nextQuestionController = new NextQuestionController()
const nextQuestionRouter = Router({ mergeParams: true })
participationsRouter.use('/:participationId/nextQuestion', nextQuestionRouter)
nextQuestionRouter.get('/', nextQuestionController.index)

export default participationsRouter
