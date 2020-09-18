/* eslint-disable no-useless-constructor */

import IQuestionsSetsRepository from '@modules/QuestionsSets/repositories/IQuestionsSetsRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import Question, { QuestionType } from '../infra/typeorm/entities/Question'
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
    private questionsRepository: IQuestionsRepository,
    @inject('QuestionsSetsRepository')
    private questionsSetsRepository: IQuestionsSetsRepository
  ) {}

  public async execute({
    name,
    description,
    type,
    options,
    questionsSetId
  }: IRequest): Promise<Question> {
    const questionsSet = await this.questionsSetsRepository.findById(
      questionsSetId
    )

    if (!questionsSet) {
      throw new AppError('Question set not found!')
    }

    const question = await this.questionsRepository.create({
      name,
      description,
      type: type as QuestionType,
      options,
      questionsSet
    })

    return question
  }
}

export default CreateQuestionService
