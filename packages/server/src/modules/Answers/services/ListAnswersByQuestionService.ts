/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Answer from '../infra/typeorm/entities/Answer'
import IAnswersRepository from '../repositories/IAnswersRepository'
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  question_id: string
}

@injectable()
class ListAnswersByQuestionService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ question_id }: IRequest): Promise<Answer[]> {
    const question = await this.questionsRepository.findById(question_id)

    if (!question) {
      throw new AppError('Question does not exist')
    }

    const answers = await this.answersRepository.findByQuestion(question)

    return answers
  }
}

export default ListAnswersByQuestionService
