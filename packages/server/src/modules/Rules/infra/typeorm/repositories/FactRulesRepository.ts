import { getRepository, Repository } from 'typeorm'

import IRulesCreatorRepository from '../../../repositories/IRulesCreatorRepository'
import ICreateRuleDTO from '../../../dtos/ICreateRuleDTO'
import { injectable } from 'tsyringe'
import Rule from '../entities/Rule'
import FactRule from '../entities/FactRule'
import AppError from '@shared/errors/AppError'

@injectable()
class FactRulesRepository implements IRulesCreatorRepository<FactRule> {
  private ormRepository: Repository<FactRule> = getRepository(FactRule)

  public async create(
    { projectId, factId }: ICreateRuleDTO,
    operands: Rule[]
  ): Promise<FactRule> {
    if (!factId) {
      throw new AppError('Fact not specified')
    }
    const rule = this.ormRepository.create({
      projectId,
      factId,
      operands
    })
    return await this.ormRepository.save(rule)
  }
}

export default FactRulesRepository
