import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListProjectRules from '@modules/Projects/services/ListProjectRulesService'

class ProjectsRulesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params
    const listProjectRules = container.resolve(ListProjectRules)
    const rules = await listProjectRules.execute(projectId)
    return response.status(201).json(rules)
  }
}

export default ProjectsRulesController
