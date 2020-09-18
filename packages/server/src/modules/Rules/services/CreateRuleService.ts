/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'

import IRulesRepository from '../repositories/IRulesRepository'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import Rule, { RuleType } from '../infra/typeorm/entities/Rule'

interface IRequest {
  questionId: string
  exactValue: any
  type: string
  operator: string
  operands: Rule[]
}

@injectable()
class CreateRuleService {
  constructor(
    @inject('RulesRepository')
    private rulesRepository: IRulesRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute({
    questionId,
    exactValue,
    type,
    operator,
    operands
  }: IRequest): Promise<Rule> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new AppError('Question not found', 401)
    }

    const rule = await this.rulesRepository.create({
      question,
      exactValue,
      type: type as RuleType,
      operator,
      operands
    })
    return rule
  }
}

export default CreateRuleService
