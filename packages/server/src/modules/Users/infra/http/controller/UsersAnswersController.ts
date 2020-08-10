import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListUsersService from '@modules/Users/services/ListUsersService'
import CreateUserAnswerService from '@modules/Users/services/CreateUserAnswerService'
import ListAnswersService from '@modules/Users/services/ListAnswersService'

export default class UsersAnswersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { question_id, value } = request.body
    const createUserAnswer = container.resolve(CreateUserAnswerService)
    const answer = await createUserAnswer.execute({
      user_id: request.user.id,
      question_id,
      value
    })
    return response.status(201).json(answer)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAnswers = container.resolve(ListAnswersService)
    const answers = await listAnswers.execute(request.user.id)
    return response.status(201).json(answers)
  }
}
