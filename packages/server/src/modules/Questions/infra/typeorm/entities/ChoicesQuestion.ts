/* eslint-disable camelcase */
import { ChildEntity } from 'typeorm'
import Question from './Question'

@ChildEntity()
class ChoicesQuestion extends Question {
  constructor() {
    super(['ChoiceMatchFact'])
  }
}

export default ChoicesQuestion
