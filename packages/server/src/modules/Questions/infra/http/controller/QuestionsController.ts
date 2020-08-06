import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateQuestionService from '../../../services/CreateQuestionService'
import ListQuestionsService from '../../../services/ListQuestionsService'

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, type } = request.body

    const createQuestion = container.resolve(CreateQuestionService)

    const question = await createQuestion.execute({ name, description, type })

    return response.status(201).json(question)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listQuestion = container.resolve(ListQuestionsService)

    const questions = await listQuestion.execute()

    return response.status(201).json(questions)
  }
}
