import Answer from '@modules/Answers/infra/typeorm/entities/Answer'
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

  async compute(answers: Answer[]): Promise<boolean> {
    console.log('Not')
    const res = await this.operands[0].compute(answers)
    return !res
  }
}

export default NotRule
