import Project from '@modules/Projects/infra/typeorm/entities/Project'

export default interface ICreateQuestionDTO {
  name: string
  description: string
  type: string
  options: any
  project: Project
}
