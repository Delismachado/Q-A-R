/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Answer from '../infra/typeorm/entities/Answer'
import IAnswersRepository from '../repositories/IAnswersRepository'
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
  question_id: string
  value: boolean
}

@injectable()
class CreateQuestionService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    question_id,
    value
  }: IRequest): Promise<Answer> {
    console.log(user_id)
    const user = await this.usersRepository.findById(user_id)
    const question = await this.questionsRepository.findById(question_id)

    if (!user) {
      throw new AppError('User does not exist')
    }

    if (!question) {
      throw new AppError('Question does not exist')
    }

    const answer = await this.answersRepository.create({
      user,
      question,
      value
    })

    return answer
  }
}

export default CreateQuestionService
