/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import Answer from '../infra/typeorm/entities/Answer'
import IAnswersRepository from '../repositories/IAnswersRepository'
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'

@injectable()
class ListQuestionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository
  ) {}

  public async execute(user_id: string): Promise<Answer[]> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('User not found')
    }
    const question = await this.answersRepository.findByUser(user)
    if (!question) {
      throw new AppError('Question not found')
    }
    return question
  }
}

export default ListQuestionsService
