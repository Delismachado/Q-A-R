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
}

export default OrRule
