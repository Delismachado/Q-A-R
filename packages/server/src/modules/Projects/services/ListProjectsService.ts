/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Project from '../infra/typeorm/entities/Project'
import IProjectsRepository from '../repositories/IProjectsRepository'

@injectable()
class ListProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private ProjectsRepository: IProjectsRepository
  ) {}

  public async execute(): Promise<Project[]> {
    const projects = await this.ProjectsRepository.all()
    return projects
  }
}

export default ListProjectsService
