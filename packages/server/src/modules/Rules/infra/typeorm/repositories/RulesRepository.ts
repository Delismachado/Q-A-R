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
    {
      question,
      exact_value,
      ruleType,
      operator,
      operand1,
      operand2
    }: ICreateRuleDTO
  ): Promise<Rule | undefined> {
    if (operand1) {
      operand1 = await this.createRecursive(operand1.id, {
        question: operand1.question,
        exact_value: operand1.exact_value,
        ruleType: operand1.ruleType,
        operator: operand1.operator,
        operand1: operand1.operand1,
        operand2: operand1.operand2
      })
    }
    if (operand2) {
      operand2 = await this.createRecursive(operand2.id, {
        question: operand2.question,
        exact_value: operand2.exact_value,
        ruleType: operand2.ruleType,
        operator: operand2.operator,
        operand1: operand2.operand1,
        operand2: operand2.operand2
      })
    }
    if (!ruleId) {
      console.log(question, exact_value, ruleType, operator, operand1, operand2)
      const rule = await this.ormRepository.create({
        question: question,
        exact_value: exact_value,
        ruleType: ruleType,
        operator: operator,
        operand1: operand1,
        operand2: operand2
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
    // const manager = this.ormRepository.manager
    // const trees = await manager.getTreeRepository(Rule)
    const rule = await this.ormRepository.findOne(rule_id)
    console.log(rule_id)
    if (rule?.operand1) {
      rule.operand1 = await this.findById(rule.operand1.id)
    }
    if (rule?.operand2) {
      rule.operand2 = await this.findById(rule.operand2.id)
    }
    return rule
  }

  public async all(): Promise<Rule[]> {
    const rules = await this.ormRepository.find()
    return rules
  }
}

export default RulesRepository
