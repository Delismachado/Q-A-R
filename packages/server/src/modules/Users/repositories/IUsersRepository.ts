import User from '../infra/typeorm/entities/User'

import ICreateUserDTO from '../dtos/ICreateUserDTO'

export interface IFindParams {
  role?: string
}

export default interface IUsersRepository {
  findAll(params: IFindParams): Promise<User[]>
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
}
