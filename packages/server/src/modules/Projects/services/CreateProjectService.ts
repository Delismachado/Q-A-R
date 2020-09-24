/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Project from '../infra/typeorm/entities/Project'
import IProjectsRepository from '../repositories/IProjectsRepository'

interface IRequest {
  name: string
}

@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private ProjectsRepository: IProjectsRepository
  ) {}

  public async execute({ name }: IRequest): Promise<Project> {
    const question = await this.ProjectsRepository.create({
      name
    })
    return question
  }
}

export default CreateProjectService
