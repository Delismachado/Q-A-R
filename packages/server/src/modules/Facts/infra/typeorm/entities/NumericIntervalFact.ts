import Answer from '@modules/Answers/infra/typeorm/entities/Answer'
import { Column, ChildEntity } from 'typeorm'
import Fact from './Fact'

@ChildEntity()
class NumericIntervalFact extends Fact {
  @Column()
  begin: number

  @Column()
  end: number

  verify(answer: Answer): boolean {
    const val = answer.values as number
    return val >= this.begin && val <= this.end
  }
}

export default NumericIntervalFact
