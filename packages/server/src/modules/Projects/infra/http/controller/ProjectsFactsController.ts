import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListFactsByProjectService from '@modules/Projects/services/ListFactsByProjectService'

class ProjectsFactsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params
    const listProjectFacts = container.resolve(ListFactsByProjectService)
    const facts = await listProjectFacts.execute(projectId)
    return response.status(201).json(facts)
  }
}

export default ProjectsFactsController
