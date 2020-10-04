import { getRepository, Repository } from 'typeorm'

import IRulesRepository from '../../../repositories/IRulesRepository'
import ICreateRuleDTO from '../../../dtos/ICreateRuleDTO'
import { injectable } from 'tsyringe'
import Rule from '../entities/Rule'
import AppError from '@shared/errors/AppError'

interface ICreateRuleDTORecursive extends ICreateRuleDTO {
  nextRule: Rule
}

@injectable()
class RulesRepository implements IRulesRepository {
  private ormRepository: Repository<Rule>

  constructor() {
    this.ormRepository = getRepository(Rule)
  }

  public async findById(rule_id: string): Promise<Rule | undefined> {
    if (!rule_id) {
      return undefined
    }
    const manager = this.ormRepository.manager
    const trees = await manager.getTreeRepository(Rule)
    const rule = await this.ormRepository.findOne(rule_id)
    if (rule) {
      await trees.findDescendantsTree(rule)
    }
    return rule
  }

  public async all(): Promise<Rule[]> {
    const rules = await this.ormRepository.find()
    return rules
  }
}

export default RulesRepository
