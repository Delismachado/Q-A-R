/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Question from '../infra/typeorm/entities/Question'
import IQuestionsRepository from '../repositories/IQuestionsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class GetQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute(question_id: string): Promise<Question> {
    const question = await this.questionsRepository.findById(question_id)
    if (!question) {
      throw new AppError('Question not found')
    }
    return question
  }
}

export default GetQuestionService
