import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO'
import IListAnswersDTO from '../dtos/IListAnswersDTO'
import Answer from '../infra/typeorm/entities/Answer'

export default interface IAnswersRepository {
  create(data: ICreateAnswerDTO): Promise<Answer>
  list(data: IListAnswersDTO): Promise<Answer[]>
}
