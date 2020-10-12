import { getRepository, Repository } from 'typeorm'

import IRulesCreatorRepository from '../../../repositories/IRulesCreatorRepository'
import ICreateRuleDTO from '../../../dtos/ICreateRuleDTO'
import { injectable } from 'tsyringe'
import Rule from '../entities/Rule'
import OrRule from '../entities/OrRule'

@injectable()
class OrRulesRepository implements IRulesCreatorRepository<OrRule> {
  private ormRepository: Repository<OrRule> = getRepository(OrRule)

  public async create(
    { projectId }: ICreateRuleDTO,
    operands: Rule[]
  ): Promise<OrRule> {
    const rule = this.ormRepository.create({
      projectId,
      operands
    })
    return await this.ormRepository.save(rule)
  }
}

export default OrRulesRepository
