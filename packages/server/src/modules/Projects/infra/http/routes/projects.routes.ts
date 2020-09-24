import { Router } from 'express'

import ProjectsController from '../controller/ProjectsController'
import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthenticated'
import ProjectsQuestionsController from '../controller/ProjectsQuestionsController'

const projectsRouter = Router()
projectsRouter.use(ensureAuthenticated)

const projectsController = new ProjectsController()

projectsRouter.post('/', projectsController.create)
projectsRouter.get('/', projectsController.index)

projectsRouter.get('/:projectId', projectsController.get)
projectsRouter.delete('/:projectId', projectsController.delete)
projectsRouter.put('/:projectId', projectsController.update)

const ProjectQuestionsController = new ProjectsQuestionsController()

const projectsQuestionsRouter = Router({ mergeParams: true })

projectsRouter.use('/:projectId/questions', projectsQuestionsRouter)

projectsQuestionsRouter.get('/', ProjectQuestionsController.index)

export default projectsRouter
