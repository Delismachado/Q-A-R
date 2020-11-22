import Question from '../infra/typeorm/entities/Question'

import ICreateQuestionDTO from '../dtos/ICreateQuestionDTO'
import Project from '@modules/Projects/infra/typeorm/entities/Project'

export default interface IQuestionsRepository {
  findByProject(project: Project): Promise<Question[]>
  findById(question_id: string): Promise<Question | undefined>
  create(data: ICreateQuestionDTO): Promise<Question>
  update(questionId: string, data: ICreateQuestionDTO): Promise<void>
  delete(question: Question): Promise<void>
  all(): Promise<Question[]>
}
