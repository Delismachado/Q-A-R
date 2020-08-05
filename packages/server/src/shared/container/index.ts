import { container } from 'tsyringe'

import IUsersRepository from '../../modules/Users/repositories/IUsersRepository'
import UsersRepository from '../../modules/Users/infra/typeorm/repositories/UserRepository'

import QuestionsRepository from '../../modules/Questions/infra/typeorm/repositories/QuestionsRepository'
import IQuestionsRepository from '../../modules/Questions/repositories/IQuestionsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository
)
