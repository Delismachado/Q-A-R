/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Participation from '../infra/typeorm/entities/Participation'
import IParticipationsRepository from '../repositories/IParticipationsRepository'

@injectable()
class ListParticipationsService {
  constructor(
    @inject('ParticipationsRepository')
    private ParticipationsRepository: IParticipationsRepository
  ) {}

  public async execute(): Promise<Participation[]> {
    const participations = await this.ParticipationsRepository.all()
    return participations
  }
}

export default ListParticipationsService
