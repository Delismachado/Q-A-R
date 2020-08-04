import { getRepository, Repository } from 'typeorm'

import IUsersRepository from '../../../repositories/IUsersRepository'
import ICreateUserDTO from '../../../dtos/ICreateUserDTO'
import User from '../entities/Users'
import { injectable } from 'tsyringe'

@injectable()
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({ name, email, role }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      role
    })
    return await this.ormRepository.save(user)
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.ormRepository.findOne(id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }
}

export default UsersRepository
