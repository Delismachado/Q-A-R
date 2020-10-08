import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateRecomendationService from '@modules/Recomendations/services/CreateRecomendationService'
import ListRecomendationsService from '@modules/Recomendations/services/ListRecomendationsService'
import GetRecomendationService from '@modules/Recomendations/services/GetRecomendationService'
import DeleteRecomendationService from '@modules/Recomendations/services/DeleteRecomendationService'
import UpdateRecomendationService from '@modules/Recomendations/services/UpdateRecomendationService'

export default class RecomendationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body
    const createRecomendation = container.resolve(CreateRecomendationService)
    const recomendation = await createRecomendation.execute(name)
    return response.status(201).json(recomendation)
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    const listRecomendations = container.resolve(ListRecomendationsService)
    const projects = await listRecomendations.execute()
    return response.status(201).json(projects)
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { recomendationId } = request.params
    const getRecomendation = container.resolve(GetRecomendationService)
    const recomendation = await getRecomendation.execute(recomendationId)
    return response.status(201).json(recomendation)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { recomendationId } = request.params
    const deleteRecomendation = container.resolve(DeleteRecomendationService)
    const project = await deleteRecomendation.execute(recomendationId)
    return response.status(201).json(project)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { recomendationId } = request.params
    const data = request.body
    const updateRecomendation = container.resolve(UpdateRecomendationService)
    const recomendation = await updateRecomendation.execute(
      recomendationId,
      data
    )
    return response.status(201).json(recomendation)
  }
}
