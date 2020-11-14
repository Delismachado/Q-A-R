/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Participation from '../infra/typeorm/entities/Participation'
import IParticipationsRepository from '../repositories/IParticipationsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class DeleteParticipationService {
  constructor(
    @inject('ParticipationsRepository')
    private participationsRepository: IParticipationsRepository
  ) {}

  public async execute(participationsId: string): Promise<Participation> {
    const participation = await this.participationsRepository.findById(
      participationsId
    )
    if (!participation) {
      throw new AppError('Participation not found!')
    }
    await this.participationsRepository.delete(participation)
    return participation
  }
}

export default DeleteParticipationService
