import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListAnswersByQuestionService from '@modules/Answers/services/ListAnswersByQuestionService'
import ListAnswersByUserService from '@modules/Answers/services/ListAnswersByUserService'

export default class AnswersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const question_id = request.query.question_id as string
    // const user_id = request.user.id
    const listAnswers = container.resolve(ListAnswersByQuestionService)
    const answers = await listAnswers.execute({ question_id })
    return response.status(201).json(answers)
  }

  public async indexByUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user_id } = request.params
    const listAnswers = container.resolve(ListAnswersByUserService)
    const answers = await listAnswers.execute(user_id)
    return response.status(201).json(answers)
  }
}
