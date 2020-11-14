/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IRecommendationsRepository from '../repositories/IRecommendationsRepository'
import Fact from '../infra/typeorm/entities/Recommendation'

@injectable()
class GetRecommendationService {
  constructor(
    @inject('RecommendationsRepository')
    private recommendationsRepository: IRecommendationsRepository
  ) {}

  public async execute(recommendationId: string): Promise<Fact> {
    const recommendation = await this.recommendationsRepository.findById(
      recommendationId
    )
    if (!recommendation) {
      throw new AppError('Recommendation not found!')
    }
    return recommendation
  }
}

export default GetRecommendationService
