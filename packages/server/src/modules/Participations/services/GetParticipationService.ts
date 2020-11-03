/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Participation from '../infra/typeorm/entities/Participation'
import IParticipationsRepository from '../repositories/IParticipationsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class GetParticipationService {
  constructor(
    @inject('ParticipationsRepository')
    private ParticipationsRepository: IParticipationsRepository
  ) {}

  public async execute(participationId: string): Promise<Participation> {
    const participation = await this.ParticipationsRepository.findById(
      participationId
    )
    if (!participation) {
      throw new AppError('Participation not found!')
    }
    return participation
  }
}

export default GetParticipationService
