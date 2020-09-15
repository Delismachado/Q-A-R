import ICreateQuestionsSetDTO from '../dtos/ICreateQuestionsSetDTO'
import QuestionsSet from '../infra/typeorm/entities/QuestionsSet'

export default interface IQuestionsSetsRepository {
  findById(question_set_id: string): Promise<QuestionsSet | undefined>
  create(data: ICreateQuestionsSetDTO): Promise<QuestionsSet>
  all(): Promise<QuestionsSet[]>
}
