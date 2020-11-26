import { Request, Response } from 'express'
import ListProjectParticipations from '@modules/Projects/services/ListProjectParticipations'

import { container } from 'tsyringe'

class ProjectsParticipationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params
    const listProjectParticipations = container.resolve(
      ListProjectParticipations
    )
    const participations = await listProjectParticipations.execute(projectId)
    return response.status(201).json(participations)
  }
}

export default ProjectsParticipationsController
