import { Column, ChildEntity } from 'typeorm'
import Fact from './Fact'

@ChildEntity()
class ChoiceMatchFact extends Fact {
  @Column()
  value: string
}

export default ChoiceMatchFact
