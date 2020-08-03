import User from '../infra/typeorm/entities/Users'

import ICreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
}
