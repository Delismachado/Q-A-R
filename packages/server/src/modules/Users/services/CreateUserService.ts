/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

// import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/Users'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  role: 'user' | 'admin'
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, role }: IRequest): Promise<User> {
    // const checkUser = await this.usersRepository.findByEmail(email)
    // if (checkUser) {
    // throw new AppError('This user is already registered');
    // }

    const user = await this.usersRepository.create({
      name,
      email,
      role
    })

    return user
  }
}

export default CreateUserService
