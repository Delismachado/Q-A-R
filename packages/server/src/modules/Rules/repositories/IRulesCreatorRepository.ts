import ICreateRuleDTO from '../dtos/ICreateRuleDTO'
import AndRule from '../infra/typeorm/entities/AndRule'
import Rule from '../infra/typeorm/entities/Rule'

interface IRulesCreatorRepository {
  create(data: ICreateRuleDTO, operands: Rule[]): Promise<AndRule>
}

export default IRulesCreatorRepository
