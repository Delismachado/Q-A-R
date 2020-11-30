import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListAnswersByQuestionService from '@modules/Answers/services/ListAnswersByQuestionService'
import ListAnswersByUserService from '@modules/Answers/services/ListAnswersByUserService'
import CreateParticipationAnswerService from '@modules/Answers/services/CreateParticipationAnswerService'

export default class AnswersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const question_id = request.query.question_id as string
    const listAnswers = container.resolve(ListAnswersByQuestionService)
    const answers = await listAnswers.execute({ question_id })
    return response.status(201).json(answers)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { participationId, questionId, values } = request.body
    const createUserAnswer = container.resolve(CreateParticipationAnswerService)
    console.log('auiq')
    const answer = await createUserAnswer.execute({
      participationId,
      questionId,
      values
    })
    return response.status(201).json(answer)
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
