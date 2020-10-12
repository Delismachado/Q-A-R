import { container } from 'tsyringe'
import IRulesRepository from '@modules/Rules/repositories/IRulesRepository'
import RulesRepository from '@modules/Rules/infra/typeorm/repositories/RulesRepository'
import NotRulesRepository from '@modules/Rules/infra/typeorm/repositories/NotRulesRepository'
import AndRulesRepository from '@modules/Rules/infra/typeorm/repositories/AndRulesRepository'
import OrRulesRepository from '@modules/Rules/infra/typeorm/repositories/OrRulesRepository'
import IRulesCreatorRepository from '@modules/Rules/repositories/IRulesCreatorRepository'
import FactRulesRepository from '@modules/Rules/infra/typeorm/repositories/FactRulesRepository'
import AndRule from '@modules/Rules/infra/typeorm/entities/AndRule'
import OrRule from '@modules/Rules/infra/typeorm/entities/OrRule'
import NotRule from '@modules/Rules/infra/typeorm/entities/NotRule'
import FactRule from '@modules/Rules/infra/typeorm/entities/FactRule'

container.registerSingleton<IRulesRepository>(
  'RulesRepository',
  RulesRepository
)

container.registerSingleton<IRulesCreatorRepository<AndRule>>(
  'AndRulesRepository',
  AndRulesRepository
)

container.registerSingleton<IRulesCreatorRepository<OrRule>>(
  'OrRulesRepository',
  OrRulesRepository
)

container.registerSingleton<IRulesCreatorRepository<NotRule>>(
  'NotRulesRepository',
  NotRulesRepository
)

container.registerSingleton<IRulesCreatorRepository<FactRule>>(
  'FactRulesRepository',
  FactRulesRepository
)
