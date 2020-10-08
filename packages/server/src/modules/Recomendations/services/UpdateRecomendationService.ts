/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IRecomendationsRepository from '../repositories/IRecomendationsRepository'
import Recomendation from '../infra/typeorm/entities/Recomendation'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'

interface IRequest {
  name: string
  questionId: string
}

@injectable()
class UpdateRecomendationService {
  constructor(
    @inject('RecomendationsRepository')
    private recomendationsRepository: IRecomendationsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute(
    recomendationId: string,
    data: IRequest
  ): Promise<Recomendation> {
    const recomendation = await this.recomendationsRepository.findById(
      recomendationId
    )
    if (!recomendation) {
      throw new AppError('Recomendation not found!')
    }

    const question = await this.questionsRepository.findById(data.questionId)
    if (!question) {
      throw new AppError('Question not found!')
    }

    recomendation.name = data.name
    recomendation.question = question
    await this.recomendationsRepository.update(recomendation)

    return recomendation
  }
}

export default UpdateRecomendationService
