import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateUserAnswerService from '@modules/Users/services/CreateUserAnswerService'
import ListAnswersService from '@modules/Users/services/ListAnswersService'
import { classToClass } from 'class-transformer'

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
    const { user_id } = request.params
    const listAnswers = container.resolve(ListAnswersService)
    const answers = await listAnswers.execute(user_id)
    return response.status(200).json(classToClass(answers))
  }
}
