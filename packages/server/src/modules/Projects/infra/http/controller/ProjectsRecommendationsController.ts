import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListProjectRecommendationsService from '@modules/Projects/services/ListProjectRecommendationsService'

class ProjectsRecommendationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params
    const listProjectRecommendations = container.resolve(
      ListProjectRecommendationsService
    )
    const rules = await listProjectRecommendations.execute(projectId)
    return response.status(201).json(rules)
  }
}

export default ProjectsRecommendationsController
