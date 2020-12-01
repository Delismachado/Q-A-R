/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import AppError from '../../../shared/errors/AppError'
import ICreateRuleDTO from '../dtos/ICreateRuleDTO'
import AndRule from '../infra/typeorm/entities/AndRule'
import FactRule from '../infra/typeorm/entities/FactRule'
import NotRule from '../infra/typeorm/entities/NotRule'
import OrRule from '../infra/typeorm/entities/OrRule'
import Rule from '../infra/typeorm/entities/Rule'
import IRulesCreatorRepository from '../repositories/IRulesCreatorRepository'
import IRulesRepository from '../repositories/IRulesRepository'

interface IRequest {
  type: string
  operands: IRequest[]
  factId?: string
}

@injectable()
class DeleteRuleService {
  constructor(
    @inject('RulesRepository')
    private rulesRepository: IRulesRepository
  ) {}

  public async execute(ruleId: string): Promise<Rule> {
    const rule = await this.rulesRepository.findById(ruleId)
    if (!rule) {
      throw new AppError('Rule not found!')
    }
    await this.rulesRepository.delete(rule)
    return rule
  }
}

export default DeleteRuleService
