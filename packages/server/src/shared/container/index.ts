import { container } from 'tsyringe'

import '@modules/Users/providers'

import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UserRepository'

import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import QuestionsRepository from '@modules/Questions/infra/typeorm/repositories/QuestionsRepository'

import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import AnswersRepository from '@modules/Answers/infra/typeorm/repositories/AnswersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository
)

container.registerSingleton<IAnswersRepository>(
  'AnswersRepository',
  AnswersRepository
)
