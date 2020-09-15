/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Question from '../infra/typeorm/entities/Question'
import IQuestionsRepository from '../repositories/IQuestionsRepository'

interface IRequest {
  name: string
  description: string
  type: string
  options: any
  questionsSetId: string
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
    options,
    questionsSetId
  }: IRequest): Promise<Question> {
    const question = await this.questionsRepository.create({
      name,
      description,
      type,
      options,
      questionsSetId
    })
    return question
  }
}

export default CreateQuestionService
