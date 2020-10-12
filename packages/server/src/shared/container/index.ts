import { container } from 'tsyringe'

import '@modules/Users/providers'

import IUsersRepository from '@modules/Users/repositories/IUsersRepository'
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UserRepository'

import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import AnswersRepository from '@modules/Answers/infra/typeorm/repositories/AnswersRepository'

import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'
import ProjectsRepository from '@modules/Projects/infra/typeorm/repositories/ProjectsRepository'

import IFactsRepository from '@modules/Facts/repositories/IFactsRepository'
import FactsRepository from '@modules/Facts/infra/typeorm/repositories/FactsRepository'

import IChoiceMatchFactsRepository from '@modules/Facts/repositories/IChoiceMatchFactsRepository'
import INumericIntervalFactsRepository from '@modules/Facts/repositories/INumericIntervalFactsRepository'

import ChoiceMatchFactsRepository from '@modules/Facts/infra/typeorm/repositories/ChoiceMatchFactsRepository'
import NumericIntervalFactsRepository from '@modules/Facts/infra/typeorm/repositories/NumericIntervalFactsRepository'

import IRecommendationsRepository from '@modules/Recommendations/repositories/IRecommendationsRepository'
import RecommendationsRepository from '@modules/Recommendations/infra/typeorm/repositories/RecommendationsRepository'
import './questions'
import './rules'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IAnswersRepository>(
  'AnswersRepository',
  AnswersRepository
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

container.registerSingleton<IRecommendationsRepository>(
  'RecommendationsRepository',
  RecommendationsRepository
)
