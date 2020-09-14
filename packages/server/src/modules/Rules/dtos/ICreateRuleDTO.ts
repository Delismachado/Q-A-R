import Question from '@modules/Questions/infra/typeorm/entities/Question'

export default interface ICreateQuestionDTO {
  question: Question
  exact_value: any
}
