/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IRecomendationsRepository from '../repositories/IRecomendationsRepository'
import Recomendation from '../infra/typeorm/entities/Recomendation'

@injectable()
class DeleteRecomendationService {
  constructor(
    @inject('FRecomendationsRepository')
    private recomendationsRepository: IRecomendationsRepository
  ) {}

  public async execute(recomendationId: string): Promise<Recomendation> {
    const recomendation = await this.recomendationsRepository.findById(
      recomendationId
    )
    if (!recomendation) {
      throw new AppError('Recomendation not found!')
    }
    await this.recomendationsRepository.delete(recomendation)
    return recomendation
  }
}

export default DeleteRecomendationService
