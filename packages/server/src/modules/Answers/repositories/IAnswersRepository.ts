import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO'
import Answer from '../infra/typeorm/entities/Answer'

export default interface IAnswersRepository {
  create(data: ICreateAnswerDTO): Promise<Answer>
}
