import { getRepository, Repository } from 'typeorm'

import IRulesRepository from '../../../repositories/IRulesRepository'
import ICreateRuleDTO from '../../../dtos/ICreateRuleDTO'
import { injectable } from 'tsyringe'
import Rule from '../entities/Rule'

@injectable()
class RulesRepository implements IRulesRepository {
  private ormRepository: Repository<Rule>

  constructor() {
    this.ormRepository = getRepository(Rule)
  }

  public async create({
    question,
    exact_value
  }: ICreateRuleDTO): Promise<Rule> {
    const Rule = this.ormRepository.create({
      question_id: question.id,
      exact_value
    })
    await this.ormRepository.save(Rule)
    return Rule
  }

  public async findById(rule_id: string): Promise<Rule | undefined> {
    const rule = await this.ormRepository.findOne(rule_id)
    return rule
  }

  public async all(): Promise<Rule[]> {
    const rules = await this.ormRepository.find()
    return rules
  }
}

export default RulesRepository
