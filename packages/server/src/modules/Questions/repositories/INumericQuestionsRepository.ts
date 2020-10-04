import Question from '../infra/typeorm/entities/Question'

import ICreateNumericQuestionDTO from '../dtos/ICreateNumericQuestionDTO'

interface INumericQuestionsRepository {
  create(data: ICreateNumericQuestionDTO): Promise<Question>
}

export default INumericQuestionsRepository
