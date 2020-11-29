import Answer from '@modules/Answers/infra/typeorm/entities/Answer'
import Fact from '@modules/Facts/infra/typeorm/entities/Fact'
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
    this.label = fact.name
    return fact.name
  }

  async compute(answers: Answer[]): Promise<boolean> {
    console.log('fact')
    const fact = await this.fact
    const questionAnswers = answers.filter(
      a => a.questionId === fact.questionId
    )
    if (questionAnswers.length === 0) {
      return false
    } else {
      const answer = questionAnswers[0]
      return fact.verify(answer)
    }
  }
}

export default FactRule
