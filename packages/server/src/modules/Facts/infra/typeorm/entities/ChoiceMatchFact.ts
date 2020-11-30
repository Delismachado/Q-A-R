import Answer from '@modules/Answers/infra/typeorm/entities/Answer'
import { Column, ChildEntity } from 'typeorm'
import Fact from './Fact'

@ChildEntity()
class ChoiceMatchFact extends Fact {
  @Column()
  value: string

  verify(answer: Answer): boolean {
    console.log(this.value, answer.values)
    return this.value === answer.values
  }
}

export default ChoiceMatchFact
