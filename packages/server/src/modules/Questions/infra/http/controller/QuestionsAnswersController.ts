import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListQuestionAnswersService from '@modules/Questions/services/ListQuestionAnswersService'

export default class QuestionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { question_id } = request.params
    const listQuestion = container.resolve(ListQuestionAnswersService)
    const questions = await listQuestion.execute(question_id)
    return response.status(201).json(questions)
  }
}
