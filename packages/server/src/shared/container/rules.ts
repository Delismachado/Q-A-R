import { container } from 'tsyringe'
import IRulesRepository from '@modules/Rules/repositories/IRulesRepository'
import RulesRepository from '@modules/Rules/infra/typeorm/repositories/RulesRepository'
import NotRulesRepository from '@modules/Rules/infra/typeorm/repositories/NotRulesRepository'
import AndRulesRepository from '@modules/Rules/infra/typeorm/repositories/AndRulesRepository'
import OrRulesRepository from '@modules/Rules/infra/typeorm/repositories/OrRulesRepository'
import IRulesCreatorRepository from '@modules/Rules/repositories/IRulesCreatorRepository'
import FactRulesRepository from '@modules/Rules/infra/typeorm/repositories/FactRulesRepository'

container.registerSingleton<IRulesRepository>(
  'RulesRepository',
  RulesRepository
)

container.registerSingleton<IRulesCreatorRepository>(
  'AndRulesRepository',
  AndRulesRepository
)

container.registerSingleton<IRulesCreatorRepository>(
  'OrRulesRepository',
  OrRulesRepository
)

container.registerSingleton<IRulesCreatorRepository>(
  'NotRulesRepository',
  NotRulesRepository
)

container.registerSingleton<IRulesCreatorRepository>(
  'FactRulesRepository',
  FactRulesRepository
)
