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
}

export default AndRule
