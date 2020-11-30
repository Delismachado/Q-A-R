import Question from '../../Questions/infra/typeorm/entities/Question'
import Participation from '@modules/Participations/infra/typeorm/entities/Participation'

export default interface ICreateAnswerDTO {
  participation: Participation
  question: Question
  values: any
}
