import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateFactService from '@modules/Facts/services/CreateFactService'
import ListFactsService from '@modules/Facts/services/ListFactsService'
import GetFactService from '@modules/Facts/services/GetFactService'
import DeleteFactService from '@modules/Facts/services/DeleteFactService'
import UpdateFactService from '@modules/Facts/services/UpdateFactService'

export default class FactsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, questionId, type, value, begin, end } = request.body
    const createFact = container.resolve(CreateFactService)
    const fact = await createFact.execute({
      name,
      questionId,
      type,
      value,
      begin,
      end
    })
    return response.status(201).json(fact)
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    const listFacts = container.resolve(ListFactsService)
    const projects = await listFacts.execute()
    return response.status(201).json(projects)
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { factId } = request.params
    const getFact = container.resolve(GetFactService)
    const fact = await getFact.execute(factId)
    return response.status(201).json(fact)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { factId } = request.params
    const deleteFact = container.resolve(DeleteFactService)
    const project = await deleteFact.execute(factId)
    return response.status(201).json(project)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { factId } = request.params
    const data = request.body
    const updateFact = container.resolve(UpdateFactService)
    const fact = await updateFact.execute(factId, data)
    return response.status(201).json(fact)
  }
}
