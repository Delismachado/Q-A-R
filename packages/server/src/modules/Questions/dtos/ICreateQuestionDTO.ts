import QuestionsSet from '@modules/QuestionsSets/infra/typeorm/entities/QuestionsSet'
import { QuestionType } from '../infra/typeorm/entities/Question'

export default interface ICreateQuestionDTO {
  name: string
  description: string
  type: QuestionType
  options: any
  questionsSet: QuestionsSet
}
