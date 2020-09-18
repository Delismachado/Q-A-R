import Question from '@modules/Questions/infra/typeorm/entities/Question'
import Rule, { RuleType } from '../infra/typeorm/entities/Rule'

export default interface ICreateRuleDTO {
  question: Question
  exactValue: any
  type: RuleType
  operator: string
  operands: Rule[]
}
