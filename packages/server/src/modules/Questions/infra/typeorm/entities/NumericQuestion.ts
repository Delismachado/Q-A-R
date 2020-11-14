/* eslint-disable camelcase */
import { ChildEntity } from 'typeorm'
import Question from './Question'

@ChildEntity()
class NumericQuestion extends Question {
  constructor() {
    super(['NumericIntervalFact', 'ChoiceMatchFact'])
  }
}

export default NumericQuestion
