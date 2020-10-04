import Fact from '@modules/Facts/infra/typeorm/entities/Fact'
/* eslint-disable camelcase */
import { ChildEntity, Column, ManyToOne } from 'typeorm'
import Rule from './Rule'

@ChildEntity()
class FactRule extends Rule {
  @Column()
  factId: string

  @ManyToOne(() => Fact)
  fact: Fact
}

export default FactRule
