import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateQuestionService from '../../../services/CreateQuestionService'
import ListQuestionsService from '../../../services/ListQuestionsService'
import GetQuestionService from '../../../services/GetQuestionService'
import UpdateQuestionService from '@modules/Questions/services/UpdateQuestionService'
import DeleteQuestionService from '@modules/Questions/services/DeleteQuestionService'

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { question_id } = request.params
    const deleteQuestion = container.resolve(DeleteQuestionService)
    const question = await deleteQuestion.execute(question_id)
    return response.status(201).json(question)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { question_id } = request.params
    const { name, description, type, options, projectId } = request.body
    const updateQuestion = container.resolve(UpdateQuestionService)
    const question = await updateQuestion.execute(question_id, {
      name,
      description,
      type,
      options,
      projectId
    })
    return response.status(201).json(question)
  }
}
