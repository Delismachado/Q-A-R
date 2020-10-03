import { Router } from 'express'

import ProjectsController from '../controller/ProjectsController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import ProjectsQuestionsController from '../controller/ProjectsQuestionsController'
import ProjectsFactsController from '../controller/ProjectsFactsController'

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

export default projectsRouter
