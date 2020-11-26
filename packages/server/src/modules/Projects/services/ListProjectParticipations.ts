/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IProjectsRepository from '../repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'
import IParticipationsRepository from '@modules/Participations/repositories/IParticipationsRepository'
import Participation from '@modules/Participations/infra/typeorm/entities/Participation'

@injectable()
class ListProjectParticipations {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('ParticipationsRepository')
    private participationsRepository: IParticipationsRepository
  ) {}

  public async execute(projectId: string): Promise<Participation[]> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new AppError('Project not found!')
    }

    const participations = await this.participationsRepository.findByProject(
      project
    )
    return participations
  }
}

export default ListProjectParticipations
