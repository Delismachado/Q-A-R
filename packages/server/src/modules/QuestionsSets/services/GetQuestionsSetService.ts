/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import QuestionsSet from '../infra/typeorm/entities/QuestionsSet'
import IQuestionsSetsRepository from '../repositories/IQuestionsSetsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class GetQuestionsSetService {
  constructor(
    @inject('QuestionsSetsRepository')
    private questionsSetsRepository: IQuestionsSetsRepository
  ) {}

  public async execute(question_set_id: string): Promise<QuestionsSet> {
    const questionsSet = await this.questionsSetsRepository.findById(
      question_set_id
    )
    if (!questionsSet) {
      throw new AppError('Question set not found')
    }
    return questionsSet
  }
}

export default GetQuestionsSetService
