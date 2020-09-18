import Question from '../infra/typeorm/entities/Question'

import ICreateQuestionDTO from '../dtos/ICreateQuestionDTO'
import QuestionsSet from '@modules/QuestionsSets/infra/typeorm/entities/QuestionsSet'

export default interface IQuestionsRepository {
  findByQuestionSet(questionsSet: QuestionsSet): Promise<Question[]>
  findById(question_id: string): Promise<Question | undefined>
  create(data: ICreateQuestionDTO): Promise<Question>
  all(): Promise<Question[]>
}
