import Question from '../infra/typeorm/entities/Question'

import ICreateChoicesQuestionDTO from '../dtos/ICreateChoicesQuestionDTO'

interface IChoicesQuestionsRepository {
  create(data: ICreateChoicesQuestionDTO): Promise<Question>
}

export default IChoicesQuestionsRepository
