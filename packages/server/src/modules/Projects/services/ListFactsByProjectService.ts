/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import Fact from '../../Facts/infra/typeorm/entities/Fact'
import IFactsRepository from '../../Facts/repositories/IFactsRepository'
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'

@injectable()
class ListFactsByProject {
  constructor(
    @inject('FactsRepository')
    private factsRepository: IFactsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute(user_id: string): Promise<Fact[]> {
    const project = await this.projectsRepository.findById(user_id)
    if (!project) {
      throw new AppError('User not found')
    }
    const facts = await this.factsRepository.findByProject(project)
    return facts
  }
}

export default ListFactsByProject
