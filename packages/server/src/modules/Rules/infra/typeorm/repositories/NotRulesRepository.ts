import { getRepository, Repository } from 'typeorm'

import IRulesCreatorRepository from '../../../repositories/IRulesCreatorRepository'
import ICreateRuleDTO from '../../../dtos/ICreateRuleDTO'
import { injectable } from 'tsyringe'
import Rule from '../entities/Rule'
import NotRule from '../entities/NotRule'

@injectable()
class NotRulesRepository implements IRulesCreatorRepository<NotRule> {
  private ormRepository: Repository<NotRule> = getRepository(NotRule)

  public async create(
    { projectId }: ICreateRuleDTO,
    operands: Rule[]
  ): Promise<NotRule> {
    const rule = this.ormRepository.create({
      type: 'NotRule',
      projectId,
      operands: operands
    })
    return await this.ormRepository.save(rule)
  }
}

export default NotRulesRepository
