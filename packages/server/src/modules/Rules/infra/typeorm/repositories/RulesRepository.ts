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

  private async createRecursive(
    ruleId: string | undefined,
    { question, exactValue, type, operator, operands }: ICreateRuleDTO
  ): Promise<Rule | undefined> {
    if (operands) {
      for (const i = 0; i < operands.length; i++) {
        const operand = operands[i]
        const newRule = await this.createRecursive(operand.id, {
          question: operand.question,
          exactValue: operand.exactValue,
          type: operand.type,
          operator: operand.operator,
          operands: operand.operands
        })
        if (!newRule) {
          throw new AppError('Failed to create expression')
        }
        operands[i] = newRule
      }
    }
    if (!ruleId) {
      const rule = await this.ormRepository.create({
        question: question,
        exactValue: exactValue,
        type: type,
        operator: operator,
        operands: operands
      })
      await this.ormRepository.save(rule)
      return rule
    } else {
      return await this.findById(ruleId)
    }
  }

  public async create(rule: ICreateRuleDTO): Promise<Rule> {
    const createdRule = await this.createRecursive(undefined, rule)
    if (!createdRule) throw new AppError('rule is already created')
    return createdRule
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
