/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import IRecommendationsRepository from '@modules/Recommendations/repositories/IRecommendationsRepository'
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'
import Recommendation from '../infra/typeorm/entities/Recommendation'

interface IRequest {
  name: string
  description: string
  projectId: string
}

@injectable()
class CreateRecommendationService {
  constructor(
    @inject('RecommendationsRepository')
    private recommendationsRepository: IRecommendationsRepository
  ) {}

  public async execute({
    name,
    description,
    projectId
  }: IRequest): Promise<Recommendation> {
    const recommendation = await this.recommendationsRepository.create({
      name,
      description,
      projectId
    })
    return recommendation
  }
}

export default CreateRecommendationService
