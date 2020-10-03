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

import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository'

import IFactsRepository from '@modules/Facts/repositories/IFactsRepository'
import FactsRepository from '@modules/Facts/infra/typeorm/repositories/FactsRepository'

import IChoiceMatchFactsRepository from '@modules/Facts/repositories/IChoiceMatchFactsRepository'
import INumericIntervalFactsRepository from '@modules/Facts/repositories/INumericIntervalFactsRepository'

import ChoiceMatchFactsRepository from '@modules/Facts/infra/typeorm/repositories/ChoiceMatchFactsRepository'
import NumericIntervalFactsRepository from '@modules/Facts/infra/typeorm/repositories/NumericIntervalFactsRepository'

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

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository
)

container.registerSingleton<IFactsRepository>(
  'FactsRepository',
  FactsRepository
)

container.registerSingleton<IChoiceMatchFactsRepository>(
  'ChoiceMatchFactsRepository',
  ChoiceMatchFactsRepository
)

container.registerSingleton<INumericIntervalFactsRepository>(
  'NumericIntervalFactsRepository',
  NumericIntervalFactsRepository
)
