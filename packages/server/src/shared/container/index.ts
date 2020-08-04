import { container } from 'tsyringe'

import IUsersRepository from '../../modules/Users/repositories/IUsersRepository'
import UsersRepository from '../../modules/Users/infra/typeorm/repositories/UserRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
