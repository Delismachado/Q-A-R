import Question from '../infra/typeorm/entities/Question'

import ICreateQuestionDTO from '../dtos/ICreateQuestionDTO'

export default interface IQuestionsRepository {
  create(data: ICreateQuestionDTO): Promise<Question>
  all(): Promise<Question[]>
}
