/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Project from '../infra/typeorm/entities/Project'
import IProjectsRepository from '../repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class GetProjectService {
  constructor(
    @inject('ProjectsRepository')
    private ProjectsRepository: IProjectsRepository
  ) {}

  public async execute(projectId: string): Promise<Project> {
    const project = await this.ProjectsRepository.findById(projectId)
    if (!project) {
      throw new AppError('Project not found!')
    }
    return project
  }
}

export default GetProjectService
