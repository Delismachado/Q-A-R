import Fact from '@modules/Facts/infra/typeorm/entities/Fact'
import { Expose } from 'class-transformer'
/* eslint-disable camelcase */
import { ChildEntity, Column, ManyToOne } from 'typeorm'
import Rule from './Rule'

@ChildEntity()
class FactRule extends Rule {
  @Column()
  factId: string

  @ManyToOne(() => Fact, {
    lazy: true
  })
  fact: Promise<Fact>

  async stringExpression(): Promise<string> {
    const fact = await this.fact
    return fact.name
  }
}

export default FactRule
