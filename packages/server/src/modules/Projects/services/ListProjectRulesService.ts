/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IProjectsRepository from '../repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'
import IRulesRepository from '@modules/Rules/repositories/IRulesRepository'
import Rule from '@modules/Rules/infra/typeorm/entities/Rule'

@injectable()
class ListProjectRules {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('RulesRepository')
    private rulesRepository: IRulesRepository
  ) {}

  public async execute(projectId: string): Promise<Rule[]> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new AppError('Project not found!')
    }

    const rules = await this.rulesRepository.findByProject(project)

    for (const rule of rules) {
      rule.label = await rule.stringExpression()
    }

    return rules
  }
}

export default ListProjectRules
