import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO'
import IListAnswersDTO from '../dtos/IListAnswersDTO'
import IListByUserDTO from '../dtos/IListByUserDTO'
import Answer from '../infra/typeorm/entities/Answer'
import Question from '@modules/Questions/infra/typeorm/entities/Question'

export default interface IAnswersRepository {
  create(data: ICreateAnswerDTO): Promise<Answer>

  findByUser(data: IListByUserDTO): Promise<Answer[]>
  findByQuestion(question: Question): Promise<Answer[]>
}
