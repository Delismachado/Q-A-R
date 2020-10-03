/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IFactsRepository from '../repositories/IFactsRepository'
import Fact from '../infra/typeorm/entities/Fact'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'

interface IRequest {
  name: string
  questionId: string
}

@injectable()
class UpdateFactService {
  constructor(
    @inject('FactsRepository')
    private factsRepository: IFactsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute(factId: string, data: IRequest): Promise<Fact> {
    const fact = await this.factsRepository.findById(factId)
    if (!fact) {
      throw new AppError('Fact not found!')
    }

    const question = await this.questionsRepository.findById(data.questionId)
    if (!question) {
      throw new AppError('Question not found!')
    }

    fact.name = data.name
    fact.question = question
    await this.factsRepository.update(fact)

    return fact
  }
}

export default UpdateFactService
