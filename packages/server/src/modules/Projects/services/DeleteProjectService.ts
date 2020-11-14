/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Project from '../infra/typeorm/entities/Project'
import IProjectsRepository from '../repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class DeleteProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute(projectId: string): Promise<Project> {
    const project = await this.projectsRepository.findById(projectId)
    if (!project) {
      throw new AppError('Project not found!')
    }
    await this.projectsRepository.delete(project)
    return project
  }
}

export default DeleteProjectService
