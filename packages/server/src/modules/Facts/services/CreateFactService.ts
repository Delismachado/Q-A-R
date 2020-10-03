/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import AppError from '@shared/errors/AppError'
import IFactsRepository from '../repositories/IFactsRepository'
import Fact from '../infra/typeorm/entities/Fact'

interface IRequest {
  name: string
  questionId: string
}

@injectable()
class CreateFactService {
  constructor(
    @inject('FactsRepository')
    private factsRepository: IFactsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ name, questionId }: IRequest): Promise<Fact> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new AppError('Question does not exist')
    }

    const fact = await this.factsRepository.create({
      name: name,
      question: question
    })

    return fact
  }
}

export default CreateFactService
