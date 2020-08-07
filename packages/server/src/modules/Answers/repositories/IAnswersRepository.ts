import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO'
import IListAnswersDTO from '../dtos/IListAnswersDTO'
import IListByUserDTO from '../dtos/IListByUserDTO'
import Answer from '../infra/typeorm/entities/Answer'

export default interface IAnswersRepository {
  findByUser(data: IListByUserDTO): Promise<Answer[]>
  create(data: ICreateAnswerDTO): Promise<Answer>
  list(data: IListAnswersDTO): Promise<Answer[]>
}
