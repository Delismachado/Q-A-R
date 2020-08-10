import Question from '@modules/Questions/infra/typeorm/entities/Question'
import User from '@modules/Users/infra/typeorm/entities/User'
import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO'
import Answer from '../infra/typeorm/entities/Answer'

export default interface IAnswersRepository {
  create(data: ICreateAnswerDTO): Promise<Answer>
  findByUser(user: User): Promise<Answer[]>
  findByQuestion(question: Question): Promise<Answer[]>
}
