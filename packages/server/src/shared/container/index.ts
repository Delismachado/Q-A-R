import { container } from 'tsyringe'

import '@modules/Users/providers'

import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UserRepository'

import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import QuestionsRepository from '@modules/Questions/infra/typeorm/repositories/QuestionsRepository'

import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import AnswersRepository from '@modules/Answers/infra/typeorm/repositories/AnswersRepository'

import IRulesRepository from '@modules/Rules/repositories/IRulesRepository'
import RulesRepository from '@modules/Rules/infra/typeorm/repositories/RulesRepository'

import IQuestionsSetsRepository from '@modules/QuestionsSets/repositories/IQuestionsSetsRepository'
import QuestionsSetsRepository from '@modules/QuestionsSets/infra/typeorm/repositories/QuestionsSetsRepository'

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

container.registerSingleton<IRulesRepository>(
  'RulesRepository',
  RulesRepository
)

container.registerSingleton<IQuestionsSetsRepository>(
  'QuestionsSetsRepository',
  QuestionsSetsRepository
)
