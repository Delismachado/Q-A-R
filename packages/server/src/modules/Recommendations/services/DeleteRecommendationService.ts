/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IRecommendationsRepository from '../repositories/IRecommendationsRepository'
import Recommendation from '../infra/typeorm/entities/Recommendation'

@injectable()
class DeleteRecommendationService {
  constructor(
    @inject('FRecommendationsRepository')
    private recommendationsRepository: IRecommendationsRepository
  ) {}

  public async execute(recommendationId: string): Promise<Recommendation> {
    const recommendation = await this.recommendationsRepository.findById(
      recommendationId
    )
    if (!recommendation) {
      throw new AppError('Recommendation not found!')
    }
    await this.recommendationsRepository.delete(recommendation)
    return recommendation
  }
}

export default DeleteRecommendationService
