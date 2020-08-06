import { getRepository, Repository } from 'typeorm'

import IUsersRepository from '../../../repositories/IUsersRepository'
import ICreateUserDTO from '../../../dtos/ICreateUserDTO'
import User from '../entities/User'
import { injectable } from 'tsyringe'

@injectable()
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({
    email,
    password,
    role
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      password,
      role
    })
    await this.ormRepository.save(user)
    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        id
      }
    })

    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        email
      }
    })

    return findUser
  }
}

export default UsersRepository
