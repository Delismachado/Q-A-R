/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import Answer from '@modules/Answers/infra/typeorm/entities/Answer'

interface IRequest {
  user_id: string
  question_id: string
  values: any
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository
  ) {}

  public async execute({
    user_id,
    question_id,
    values
  }: IRequest): Promise<Answer> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('User not found', 401)
    }

    const question = await this.questionsRepository.findById(question_id)
    if (!question) {
      throw new AppError('Question not found', 401)
    }


    const answer = this.answersRepository.create({
      question,
      user,
      values
    })

    return answer
  }
}

export default CreateUserService
