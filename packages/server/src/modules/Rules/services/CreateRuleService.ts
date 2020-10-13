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
    { factId, type }: IRequest,
    operands: Rule[],
    projectId: string
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

  private async createRecursive(
    data: IRequest,
    projectId: string
  ): Promise<Rule> {
    if (data.operands) {
      const operands: Rule[] = await Promise.all(
        data.operands.map(dt => this.createRecursive(dt, projectId))
      )
      return await this.createRule(data, operands, projectId)
    }
    return await this.createRule(data, [], projectId)
  }

  public async execute(data: IRequest, projectId: string): Promise<Rule> {
    const rule = await this.createRecursive(data, projectId)
    return rule
  }
}

export default CreateRuleService
