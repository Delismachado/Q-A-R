/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  role?: string
}

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ role }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAll({ role })
    return users
  }
}

export default ListUsersService
