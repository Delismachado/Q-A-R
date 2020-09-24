import Project from '@modules/Projects/infra/typeorm/entities/Project'
import { QuestionType } from '../infra/typeorm/entities/Question'

export default interface ICreateQuestionDTO {
  name: string
  description: string
  type: QuestionType
  options: any
  project: Project
}
