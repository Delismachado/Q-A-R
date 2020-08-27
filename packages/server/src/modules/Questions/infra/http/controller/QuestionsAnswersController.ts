import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListQuestionAnswersService from '@modules/Questions/services/ListQuestionAnswersService'
import { classToClass } from 'class-transformer'

export default class QuestionsAnswersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { question_id } = request.params
    const listQuestionAnswer = container.resolve(ListQuestionAnswersService)
    const questions = await listQuestionAnswer.execute(question_id)
    return response.status(201).json(classToClass(questions))
  }
}
