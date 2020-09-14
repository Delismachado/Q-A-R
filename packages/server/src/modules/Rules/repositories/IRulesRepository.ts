import Rule from '../infra/typeorm/entities/Rule'

import ICreateRuleDTO from '../dtos/ICreateRuleDTO'

export default interface IRulesRepository {
  findById(Rule_id: string): Promise<Rule | undefined>
  create(data: ICreateRuleDTO): Promise<Rule>
  all(): Promise<Rule[]>
}
