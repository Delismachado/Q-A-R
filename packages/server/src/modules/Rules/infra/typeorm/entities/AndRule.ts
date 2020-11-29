import Answer from '@modules/Answers/infra/typeorm/entities/Answer'
import { Expose } from 'class-transformer'
import { ChildEntity } from 'typeorm'
import Rule from './Rule'

@ChildEntity()
class AndRule extends Rule {
  async stringExpression(): Promise<string> {
    const subExpressions = await Promise.all(
      this.operands.map(o => o.stringExpression())
    )
    return '(' + subExpressions.join(') AND (') + ')'
  }

  async compute(answers: Answer[]): Promise<boolean> {
    for (const operand of this.operands) {
      const res = await operand.compute(answers)
      if (!res) {
        return false
      }
    }
    return true
  }
}

export default AndRule
