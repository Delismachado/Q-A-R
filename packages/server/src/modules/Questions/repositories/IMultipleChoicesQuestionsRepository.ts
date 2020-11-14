import Question from '../infra/typeorm/entities/Question'

import ICreateMultipleChoicesQuestionDTO from '../dtos/ICreateMultipleChoicesQuestionDTO'

interface IMultipleChoicesQuestionsRepository {
  create(data: ICreateMultipleChoicesQuestionDTO): Promise<Question>
}

export default IMultipleChoicesQuestionsRepository
