import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateRuleService from '@modules/Rules/services/CreateRuleService'
import ListRulesService from '@modules/Rules/services/ListRulesService'
import GetRuleService from '@modules/Rules/services/GetRuleService'

export default class RulesAnswersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { projectId, type, operands, factId } = request.body
    const createRule = container.resolve(CreateRuleService)
    const rule = await createRule.execute({
      projectId,
      type,
      operands,
      factId
    })
    return response.status(201).json(rule)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listRule = container.resolve(ListRulesService)
    const rules = await listRule.execute()
    return response.status(201).json(rules)
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { rule_id } = request.params
    const getRule = container.resolve(GetRuleService)
    const rule = await getRule.execute(rule_id)
    return response.status(201).json(rule)
  }
}
