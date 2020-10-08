/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IRecomendationsRepository from '../repositories/IRecomendationsRepository'
import Fact from '../infra/typeorm/entities/Recomendation'

@injectable()
class ListRecomendationsService {
  constructor(
    @inject('RecomendationsRepository')
    private recomendationsRepository: IRecomendationsRepository
  ) {}

  public async execute(): Promise<Fact[]> {
    const recomendations = await this.recomendationsRepository.all()
    if (!recomendations) {
      throw new AppError('Recomendation not found!')
    }
    return recomendations
  }
}

export default ListRecomendationsService
