/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import AppError from '@shared/errors/AppError'
import Fact from '../infra/typeorm/entities/Fact'
import IChoiceMatchFactsRepository from '../repositories/IChoiceMatchFactsRepository'
import INumericIntervalFactsRepository from '../repositories/INumericIntervalFactsRepository'

interface IRequest {
  name: string
  questionId: string
  type: string
  value?: string
  begin?: number
  end?: number
}

@injectable()
class CreateFactService {
  constructor(
    @inject('ChoiceMatchFactsRepository')
    private choiceMatchFactsRepository: IChoiceMatchFactsRepository,
    @inject('NumericIntervalFactsRepository')
    private numericIntervalFactsRepository: INumericIntervalFactsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({
    name,
    questionId,
    type,
    value,
    begin,
    end
  }: IRequest): Promise<Fact> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new AppError('Question does not exist')
    }

    const fact = { name, question, type }

    switch (type) {
      case 'NumericIntervalFact':
        if (typeof begin === 'undefined' || typeof end === 'undefined') {
          throw new AppError('Interval must be specified')
        }
        return await this.numericIntervalFactsRepository.create({
          ...fact,
          begin,
          end
        })
      case 'ChoiceMatchFact':
        if (!value) {
          throw new AppError('Value must be specified')
        }
        return await this.choiceMatchFactsRepository.create({
          ...fact,
          value
        })
      default:
        throw new AppError('Unknown fact type ' + type)
    }
  }
}

export default CreateFactService
