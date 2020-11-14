import { Column, ChildEntity } from 'typeorm'
import Fact from './Fact'

@ChildEntity()
class NumericIntervalFact extends Fact {
  @Column()
  begin: number

  @Column()
  end: number
}

export default NumericIntervalFact
