/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IRecommendationsRepository from '../repositories/IRecommendationsRepository'
import Fact from '../infra/typeorm/entities/Recommendation'

@injectable()
class ListRecommendationsService {
  constructor(
    @inject('RecommendationsRepository')
    private recommendationsRepository: IRecommendationsRepository
  ) {}

  public async execute(): Promise<Fact[]> {
    const recommendations = await this.recommendationsRepository.all()
    if (!recommendations) {
      throw new AppError('Recommendation not found!')
    }
    return recommendations
  }
}

export default ListRecommendationsService
