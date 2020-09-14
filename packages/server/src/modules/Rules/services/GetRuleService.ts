/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Rule from '../infra/typeorm/entities/Rule'
import IRulesRepository from '../repositories/IRulesRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class GetRuleService {
  constructor(
    @inject('RulesRepository')
    private rulesRepository: IRulesRepository
  ) {}

  public async execute(rule_id: string): Promise<Rule> {
    const rule = await this.rulesRepository.findById(rule_id)
    if (!rule) {
      throw new AppError('Rule not found')
    }
    return rule
  }
}

export default GetRuleService
