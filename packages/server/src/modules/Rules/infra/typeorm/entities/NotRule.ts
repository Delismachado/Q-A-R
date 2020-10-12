import { Expose } from 'class-transformer'
/* eslint-disable camelcase */
import { ChildEntity } from 'typeorm'
import Rule from './Rule'

@ChildEntity()
class NotRule extends Rule {
  async stringExpression(): Promise<string> {
    const se = await this.operands[0].stringExpression()
    return Promise.resolve('NOT (' + se + ')')
  }
}

export default NotRule
