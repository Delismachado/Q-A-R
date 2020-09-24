/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Project from '../infra/typeorm/entities/Project'
import IProjectsRepository from '../repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'
import ICreateProjectDTO from '../dtos/ICreateProjectDTO'

@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private ProjectsRepository: IProjectsRepository
  ) {}

  public async execute(
    projectId: string,
    data: ICreateProjectDTO
  ): Promise<Project> {
    const project = await this.ProjectsRepository.findById(projectId)
    if (!project) {
      throw new AppError('Project not found!')
    }
    project.name = data.name
    await this.ProjectsRepository.update(project)
    return project
  }
}

export default UpdateProjectService
