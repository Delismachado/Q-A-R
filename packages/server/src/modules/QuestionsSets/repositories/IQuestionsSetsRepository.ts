import ICreateQuestionsSetDTO from '../dtos/ICreateQuestionsSetDTO'
import QuestionsSet from '../infra/typeorm/entities/QuestionsSet'

export default interface IQuestionsSetsRepository {
  findById(questionsSetId: string): Promise<QuestionsSet | undefined>
  create(data: ICreateQuestionsSetDTO): Promise<QuestionsSet>
  all(): Promise<QuestionsSet[]>
}
