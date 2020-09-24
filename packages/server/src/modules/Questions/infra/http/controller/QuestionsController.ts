import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateQuestionService from '../../../services/CreateQuestionService'
import ListQuestionsService from '../../../services/ListQuestionsService'
import GetQuestionService from '../../../services/GetQuestionService'

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, type, options, projectId } = request.body
    const createQuestion = container.resolve(CreateQuestionService)
    const question = await createQuestion.execute({
      name,
      description,
      type,
      options,
      projectId
    })
    return response.status(201).json(question)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listQuestion = container.resolve(ListQuestionsService)
    const questions = await listQuestion.execute()
    return response.status(201).json(questions)
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { question_id } = request.params
    const getQuestion = container.resolve(GetQuestionService)
    const question = await getQuestion.execute(question_id)
    return response.status(201).json(question)
  }
}
