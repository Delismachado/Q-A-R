/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'

import Rule from '../infra/typeorm/entities/Rule'
import IRulesCreatorRepository from '../repositories/IRulesCreatorRepository'
import ICreateRuleDTO from '../dtos/ICreateRuleDTO'

interface IRequest {
  type: string
  operands: IRequest[]
  factId?: string
}

@injectable()
class CreateRuleService {
  constructor(
    @inject('AndRulesRepository')
    private andRulesRepository: IRulesCreatorRepository,
    @inject('OrRulesRepository')
    private orRulesRepository: IRulesCreatorRepository,
    @inject('NotRulesRepository')
    private notRulesRepository: IRulesCreatorRepository,
    @inject('FactRulesRepository')
    private factRulesRepository: IRulesCreatorRepository
  ) {}

  private async createRule(data: IRequest, operands: Rule[]): Promise<Rule> {
    const createDto: ICreateRuleDTO = {
      factId: data.factId
    }
    switch (data.type) {
      case 'AndRule':
        return await this.andRulesRepository.create(createDto, operands)
      case 'OrRule':
        return await this.orRulesRepository.create(createDto, operands)
      case 'NotRule':
        return await this.notRulesRepository.create(createDto, operands)
      case 'FactRule':
        return await this.factRulesRepository.create(createDto, operands)
      default:
        throw new AppError('Unknown rule type ' + data.type)
    }
  }

  private async createRecursive(data: IRequest): Promise<Rule> {
    const operands: Rule[] = await Promise.all(
      data.operands.map(dt => this.createRecursive(dt))
    )
    return await this.createRule(data, operands)
  }

  public async execute(data: IRequest): Promise<Rule> {
    const rule = await this.createRecursive(data)
    return rule
  }
}

export default CreateRuleService
