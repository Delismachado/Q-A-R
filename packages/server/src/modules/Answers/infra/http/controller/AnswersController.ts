import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateAnswerService from '../../../services/CreateAnswerService'

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { question_id, value } = request.body
    const user_id = request.user.id

    const createAnswer = container.resolve(CreateAnswerService)

    const question = await createAnswer.execute({ user_id, question_id, value })

    return response.status(201).json(question)
  }
}
