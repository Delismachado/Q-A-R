/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  email: string
  password: string
  role: 'user' | 'admin'
}

@injectable()
class CreateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password, role }: IRequest): Promise<User> {
    const checkUser = await this.usersRepository.findByEmail(email)
    if (checkUser) {
      throw new AppError('This user is already registered', 401)
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      email,
      role,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService
