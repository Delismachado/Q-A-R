import { Router } from 'express'

import ProjectsController from '../controller/ProjectsController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import ProjectsQuestionsController from '../controller/ProjectsQuestionsController'
import ProjectsFactsController from '../controller/ProjectsFactsController'
import ProjectsRulesController from '../controller/ProjectsRulesController'
import ProjectsParticipationsController from '../controller/ProjectsParticipationsController'
import ProjectsRecommendationsController from '../controller/ProjectsRecommendationsController'

const projectsController = new ProjectsController()
const projectsRouter = Router()
projectsRouter.use(ensureAuthenticated)
projectsRouter.post('/', projectsController.create)
projectsRouter.get('/', projectsController.index)
projectsRouter.get('/:projectId', projectsController.get)
projectsRouter.delete('/:projectId', projectsController.delete)
projectsRouter.put('/:projectId', projectsController.update)

const projectQuestionsController = new ProjectsQuestionsController()
const projectsQuestionsRouter = Router({ mergeParams: true })
projectsRouter.use('/:projectId/questions', projectsQuestionsRouter)
projectsQuestionsRouter.get('/', projectQuestionsController.index)

const projectFactsController = new ProjectsFactsController()
const projectsFactsRouter = Router({ mergeParams: true })
projectsRouter.use('/:projectId/facts', projectsFactsRouter)
projectsFactsRouter.get('/', projectFactsController.index)

const projectRulesController = new ProjectsRulesController()
const projectsRulesRouter = Router({ mergeParams: true })
projectsRouter.use('/:projectId/rules', projectsRulesRouter)
projectsRulesRouter.get('/', projectRulesController.index)

const projectParticipationsController = new ProjectsParticipationsController()
const projectsParticipationsRouter = Router({ mergeParams: true })
projectsRouter.use('/:projectId/participations', projectsParticipationsRouter)
projectsParticipationsRouter.get('/', projectParticipationsController.index)

const projectRecommendationsController = new ProjectsRecommendationsController()
const projectsRecommendationsRouter = Router({ mergeParams: true })
projectsRouter.use('/:projectId/recommendations', projectsRecommendationsRouter)
projectsRecommendationsRouter.get('/', projectRecommendationsController.index)

export default projectsRouter
