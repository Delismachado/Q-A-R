/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import Answer from '@modules/Answers/infra/typeorm/entities/Answer'

@injectable()
class ListAnswersService {
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
    const answers = await this.answersRepository.findByUser({ user })
    return answers
  }
}

export default ListAnswersService
