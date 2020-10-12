import { getRepository, Repository } from 'typeorm'

import IRulesCreatorRepository from '../../../repositories/IRulesCreatorRepository'
import ICreateRuleDTO from '../../../dtos/ICreateRuleDTO'
import { injectable } from 'tsyringe'
import Rule from '../entities/Rule'
import AndRule from '../entities/AndRule'

@injectable()
class AndRulesRepository implements IRulesCreatorRepository<AndRule> {
  private ormRepository: Repository<AndRule> = getRepository(AndRule)

  public async create(
    { projectId }: ICreateRuleDTO,
    operands: Rule[]
  ): Promise<AndRule> {
    const rule = this.ormRepository.create({
      projectId,
      operands: operands
    })
    return await this.ormRepository.save(rule)
  }
}

export default AndRulesRepository
