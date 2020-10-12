import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateRecommendationService from '@modules/Recommendations/services/CreateRecommendationService'
import ListRecommendationsService from '@modules/Recommendations/services/ListRecommendationsService'
import GetRecommendationService from '@modules/Recommendations/services/GetRecommendationService'
import DeleteRecommendationService from '@modules/Recommendations/services/DeleteRecommendationService'
import UpdateRecommendationService from '@modules/Recommendations/services/UpdateRecommendationService'

export default class RecommendationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body
    const createRecommendation = container.resolve(CreateRecommendationService)
    const recommendation = await createRecommendation.execute(name)
    return response.status(201).json(recommendation)
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    const listRecommendations = container.resolve(ListRecommendationsService)
    const projects = await listRecommendations.execute()
    return response.status(201).json(projects)
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { recommendationId } = request.params
    const getRecommendation = container.resolve(GetRecommendationService)
    const recommendation = await getRecommendation.execute(recommendationId)
    return response.status(201).json(recommendation)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { recommendationId } = request.params
    const deleteRecommendation = container.resolve(DeleteRecommendationService)
    const project = await deleteRecommendation.execute(recommendationId)
    return response.status(201).json(project)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { recommendationId } = request.params
    const data = request.body
    const updateRecommendation = container.resolve(UpdateRecommendationService)
    const recommendation = await updateRecommendation.execute(
      recommendationId,
      data
    )
    return response.status(201).json(recommendation)
  }
}
