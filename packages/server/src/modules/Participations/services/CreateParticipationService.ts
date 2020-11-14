/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Participation from '../infra/typeorm/entities/Participation'
import IParticipationsRepository from '../repositories/IParticipationsRepository'

interface IRequest {
  userId: string
  projectId: string
}

@injectable()
class CreateParticipationService {
  constructor(
    @inject('ParticipationsRepository')
    private ParticipationsRepository: IParticipationsRepository
  ) {}

  public async execute({
    userId,
    projectId
  }: IRequest): Promise<Participation> {
    const participation = await this.ParticipationsRepository.create({
      userId,
      projectId
    })
    return participation
  }
}

export default CreateParticipationService
