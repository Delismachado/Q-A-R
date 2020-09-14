/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'

import IRulesRepository from '../repositories/IRulesRepository'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import Rule from '../infra/typeorm/entities/Rule'

interface IRequest {
  question_id: string
  exact_value: any
}

@injectable()
class CreateRuleService {
  constructor(
    @inject('RulesRepository')
    private rulesRepository: IRulesRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({ question_id, exact_value }: IRequest): Promise<Rule> {
    const question = await this.questionsRepository.findById(question_id)
    if (!question) {
      throw new AppError('Question not found', 401)
    }
    const rule = await this.rulesRepository.create({
      question,
      exact_value
    })
    return rule
  }
}

export default CreateRuleService
