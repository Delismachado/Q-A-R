import Question from '@modules/Questions/infra/typeorm/entities/Question'
import Rule from '../infra/typeorm/entities/Rule'

export default interface ICreateQuestionDTO {
  question: Question
  exact_value: any
  ruleType: string
  operator: string
  operand1: Rule | undefined
  operand2: Rule | undefined
}
