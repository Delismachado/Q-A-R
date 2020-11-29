import Answer from '@modules/Answers/infra/typeorm/entities/Answer'
import { Expose } from 'class-transformer'
/* eslint-disable camelcase */
import { ChildEntity } from 'typeorm'
import Rule from './Rule'

@ChildEntity()
class OrRule extends Rule {
  async stringExpression(): Promise<string> {
    const subExpressions = await Promise.all(
      this.operands.map(o => o.stringExpression())
    )
    return '(' + subExpressions.join(') OR (') + ')'
  }

  async compute(answers: Answer[]): Promise<boolean> {
    console.log('OR')
    for (const operand of this.operands) {
      const res = await operand.compute(answers)
      if (res) {
        return true
      }
    }
    return false
  }
}

export default OrRule
