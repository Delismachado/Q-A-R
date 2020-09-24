import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListProjectQuestions from '@modules/Projects/services/ListProjectQuestions'

class ProjectsQuestionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params
    const listProjectQuestions = container.resolve(ListProjectQuestions)
    const questions = await listProjectQuestions.execute(projectId)
    return response.status(201).json(questions)
  }
}

export default ProjectsQuestionsController
