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

interface IRequest {
  projectId: string
  type: string
  operands: IRequest[]
  factId?: string
}

@injectable()
class CreateRuleService {
  constructor(
    @inject('AndRulesRepository')
    private andRulesRepository: IRulesCreatorRepository<AndRule>,
    @inject('OrRulesRepository')
    private orRulesRepository: IRulesCreatorRepository<OrRule>,
    @inject('NotRulesRepository')
    private notRulesRepository: IRulesCreatorRepository<NotRule>,
    @inject('FactRulesRepository')
    private factRulesRepository: IRulesCreatorRepository<FactRule>
  ) {}

  private async createRule(
    { projectId, factId, type }: IRequest,
    operands: Rule[]
  ): Promise<Rule> {
    const createDto: ICreateRuleDTO = {
      projectId,
      factId
    }
    switch (type) {
      case 'AndRule':
        return await this.andRulesRepository.create(createDto, operands)
      case 'OrRule':
        return await this.orRulesRepository.create(createDto, operands)
      case 'NotRule':
        return await this.notRulesRepository.create(createDto, operands)
      case 'FactRule':
        return await this.factRulesRepository.create(createDto, operands)
      default:
        throw new AppError('Unknown rule type ' + type)
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
