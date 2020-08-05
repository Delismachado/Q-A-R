import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateQuestionService from '../../../services/CreateQuestionService'

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, type } = request.body

    const createQuestion = container.resolve(CreateQuestionService)

    const question = await createQuestion.execute({ name, description, type })

    return response.status(201).json(question)
  }
}
