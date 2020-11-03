/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Participation from '../infra/typeorm/entities/Participation'
import IParticipationsRepository from '../repositories/IParticipationsRepository'
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
  userId: string
  projectId: string
}

@injectable()
class UpdateParticipationService {
  constructor(
    @inject('ParticipationsRepository')
    private participationsRepository: IParticipationsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(
    participationId: string,
    data: IRequest
  ): Promise<Participation> {
    const participation = await this.participationsRepository.findById(
      participationId
    )
    if (!participation) {
      throw new AppError('Participation not found!')
    }

    const project = await this.projectsRepository.findById(data.projectId)
    if (!project) {
      throw new AppError('Project not found!')
    }

    const user = await this.usersRepository.findById(data.userId)
    if (!user) {
      throw new AppError('User not found!')
    }
    participation.project = project
    participation.projectId = project.id
    participation.user = user
    participation.userId = user.id
    await this.participationsRepository.update(participation)

    return participation
  }
}

export default UpdateParticipationService
