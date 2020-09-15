import Question from '../infra/typeorm/entities/Question'

import ICreateQuestionDTO from '../dtos/ICreateQuestionDTO'

export default interface IQuestionsRepository {
  findByQuestionSetId(questionSetId: string): Promise<Question[]>
  findById(question_id: string): Promise<Question | undefined>
  create(data: ICreateQuestionDTO): Promise<Question>
  all(): Promise<Question[]>
}
