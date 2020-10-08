/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IRecomendationsRepository from '../repositories/IRecomendationsRepository'
import Fact from '../infra/typeorm/entities/Recomendation'

@injectable()
class GetRecomendationService {
  constructor(
    @inject('RecomendationsRepository')
    private recomendationsRepository: IRecomendationsRepository
  ) {}

  public async execute(recomendationId: string): Promise<Fact> {
    const recomendation = await this.recomendationsRepository.findById(
      recomendationId
    )
    if (!recomendation) {
      throw new AppError('Recomendation not found!')
    }
    return recomendation
  }
}

export default GetRecomendationService
