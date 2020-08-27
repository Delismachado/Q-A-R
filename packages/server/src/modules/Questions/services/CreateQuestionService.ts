/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'

import Question from '../infra/typeorm/entities/Question'
import IQuestionsRepository from '../repositories/IQuestionsRepository'

interface IRequest {
  name: string
  description: string
  type: string
  options: any
}

@injectable()
class CreateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({
    name,
    description,
    type,
    options
  }: IRequest): Promise<Question> {
    const question = await this.questionsRepository.create({
      name,
      description,
      type,
      options
    })

    return question
  }
}

export default CreateQuestionService
