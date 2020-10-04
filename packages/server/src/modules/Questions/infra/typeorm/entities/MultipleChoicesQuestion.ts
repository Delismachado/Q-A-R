/* eslint-disable camelcase */
import { ChildEntity } from 'typeorm'
import Question from './Question'

@ChildEntity()
class MultipleChoicesQuestion extends Question {
  constructor() {
    super([])
  }
}

export default MultipleChoicesQuestion
