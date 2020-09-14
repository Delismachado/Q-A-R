/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Rule from '../infra/typeorm/entities/Rule'
import IRulesRepository from '../repositories/IRulesRepository'

@injectable()
class ListRulesService {
  constructor(
    @inject('RulesRepository')
    private rulesRepository: IRulesRepository
  ) {}

  public async execute(): Promise<Rule[]> {
    const rule = await this.rulesRepository.all()
    return rule
  }
}

export default ListRulesService
