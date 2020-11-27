/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IProjectsRepository from '../repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'
import IRecommendationsRepository from '@modules/Recommendations/repositories/IRecommendationsRepository'
import Recommendation from '@modules/Recommendations/infra/typeorm/entities/Recommendation'

@injectable()
class ListProjectRecommendationsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('RecommendationsRepository')
    private recommendationsRepository: IRecommendationsRepository
  ) {}

  public async execute(projectId: string): Promise<Recommendation[]> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new AppError('Project not found!')
    }

    const recommendations = await this.recommendationsRepository.findByProject(
      project
    )

    return recommendations
  }
}

export default ListProjectRecommendationsService
