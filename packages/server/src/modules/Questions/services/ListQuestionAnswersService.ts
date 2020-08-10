/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Question from '../infra/typeorm/entities/Question'
import IQuestionsRepository from '../repositories/IQuestionsRepository'
import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import Answer from '@modules/Answers/infra/typeorm/entities/Answer'
import AppError from '@shared/errors/AppError'

@injectable()
class ListQuestionsAnswersService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository
  ) {}

  public async execute(question_id: string): Promise<Answer[]> {
    const question = await this.questionsRepository.findById(question_id)
    if (!question) {
      throw new AppError('Question not found', 404)
    }
    return this.answersRepository.findByQuestion(question)
  }
}

export default ListQuestionsAnswersService
