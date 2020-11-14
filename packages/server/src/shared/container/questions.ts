import ChoicesQuestionsRepository from '@modules/Questions/infra/typeorm/repositories/ChoicesQuestionsRepository'
import MultipleChoicesQuestionsRepository from '@modules/Questions/infra/typeorm/repositories/MultipleChoicesQuestionsRepository'
import NumericQuestionsRepository from '@modules/Questions/infra/typeorm/repositories/NumericQuestionsRepository'
import QuestionsRepository from '@modules/Questions/infra/typeorm/repositories/QuestionsRepository'
import TrueFalseQuestionsRepository from '@modules/Questions/infra/typeorm/repositories/TrueFalseQuestionsRepository'
import IChoicesQuestionsRepository from '@modules/Questions/repositories/IChoicesQuestionsRepository'
import IMultipleChoicesQuestionsRepository from '@modules/Questions/repositories/IMultipleChoicesQuestionsRepository'
import INumericQuestionsRepository from '@modules/Questions/repositories/INumericQuestionsRepository'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import ITrueFalseQuestionsRepository from '@modules/Questions/repositories/ITrueFalseQuestionsRepository'

import { container } from 'tsyringe'

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository
)

container.registerSingleton<ITrueFalseQuestionsRepository>(
  'TrueFalseQuestionsRepository',
  TrueFalseQuestionsRepository
)

container.registerSingleton<IChoicesQuestionsRepository>(
  'ChoicesQuestionsRepository',
  ChoicesQuestionsRepository
)

container.registerSingleton<IMultipleChoicesQuestionsRepository>(
  'MultipleChoicesQuestionsRepository',
  MultipleChoicesQuestionsRepository
)

container.registerSingleton<INumericQuestionsRepository>(
  'NumericQuestionsRepository',
  NumericQuestionsRepository
)
