import { getRepository, Repository } from 'typeorm'

import IRulesCreatorRepository from '../../../repositories/IRulesCreatorRepository'
import ICreateRuleDTO from '../../../dtos/ICreateRuleDTO'
import { injectable } from 'tsyringe'
import Rule from '../entities/Rule'
import NotRule from '../entities/NotRule'

interface ICreateRuleDTORecursive extends ICreateRuleDTO {
  nextRule: Rule
}

@injectable()
class NotRulesRepository implements IRulesCreatorRepository {
  private ormRepository: Repository<NotRule> = getRepository(NotRule)

  public async create(_: ICreateRuleDTO, operands: Rule[]): Promise<NotRule> {
    const rule = this.ormRepository.create({
      operands: operands
    })
    return await this.ormRepository.save(rule)
  }
}

export default NotRulesRepository
