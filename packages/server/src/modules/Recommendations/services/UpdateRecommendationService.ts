/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IRecommendationsRepository from '../repositories/IRecommendationsRepository'
import Recommendation from '../infra/typeorm/entities/Recommendation'
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'

interface IRequest {
  name: string
  projectId: string
}

@injectable()
class UpdateRecommendationService {
  constructor(
    @inject('RecommendationsRepository')
    private recommendationsRepository: IRecommendationsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute(
    recommendationId: string,
    data: IRequest
  ): Promise<Recommendation> {
    const recommendation = await this.recommendationsRepository.findById(
      recommendationId
    )
    if (!recommendation) {
      throw new AppError('Recommendation not found!')
    }

    const project = await this.projectsRepository.findById(data.projectId)
    if (!project) {
      throw new AppError('Project not found!')
    }

    recommendation.name = data.name
    recommendation.project = project
    await this.recommendationsRepository.update(recommendation)

    return recommendation
  }
}

export default UpdateRecommendationService
