import Question from '../infra/typeorm/entities/Question'

import ICreateTrueFalseQuestionDTO from '../dtos/ICreateTrueFalseQuestionDTO'

interface ITrueFalseQuestionsRepository {
  create(data: ICreateTrueFalseQuestionDTO): Promise<Question>
}

export default ITrueFalseQuestionsRepository
