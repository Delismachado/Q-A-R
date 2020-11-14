/* eslint-disable camelcase */
import { ChildEntity } from 'typeorm'
import Question from './Question'

@ChildEntity()
class TrueFalseQuestion extends Question {
  constructor() {
    super([])
  }
}

export default TrueFalseQuestion
