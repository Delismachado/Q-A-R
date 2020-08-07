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
class ListAnswersService {
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

    const answers = await this.answersRepository.list({
      question
    })

    return answers
  }
}

export default ListAnswersService
