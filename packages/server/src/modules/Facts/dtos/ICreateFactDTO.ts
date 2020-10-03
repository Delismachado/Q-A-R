import Question from '@modules/Questions/infra/typeorm/entities/Question'

export default interface ICreateFactDTO {
  name: string
  question: Question
  type: string
}
