/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Question from '../infra/typeorm/entities/Question'
import IQuestionsRepository from '../repositories/IQuestionsRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class DeleteQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute(questionId: string): Promise<Question> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new AppError('Question not found')
    }
    this.questionsRepository.delete(question)
    return question
  }
}

export default DeleteQuestionService
