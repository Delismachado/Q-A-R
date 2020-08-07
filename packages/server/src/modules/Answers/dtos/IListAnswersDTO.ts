import User from '../../Users/infra/typeorm/entities/User'
import Question from '../../Questions/infra/typeorm/entities/Question'

export default interface ICreateAnswerDTO {
  question: Question
}
