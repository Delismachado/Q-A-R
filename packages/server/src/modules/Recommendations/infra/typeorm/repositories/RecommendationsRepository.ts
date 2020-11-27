import { getRepository, Repository } from 'typeorm'
import { injectable } from 'tsyringe'
import IRecommendationsRepositoryDTO from '@modules/Recommendations/dtos/ICreateRecommendationDTO'
import IRecommendationsRepository from '@modules/Recommendations/repositories/IRecommendationsRepository'
import Recommendation from '../entities/Recommendation'
import Project from '@modules/Projects/infra/typeorm/entities/Project'

@injectable()
class RecommendationsRepository implements IRecommendationsRepository {
  private ormRepository: Repository<Recommendation>

  constructor() {
    this.ormRepository = getRepository(Recommendation)
  }

  public async all(): Promise<Recommendation[]> {
    const recommendations = await this.ormRepository.find()
    return recommendations
  }

  public async findById(
    recommendationId: string
  ): Promise<Recommendation | undefined> {
    const recommendation = await this.ormRepository.findOne(recommendationId)
    return recommendation
  }

  public async findByProject(project: Project): Promise<Recommendation[]> {
    const recommendations = await this.ormRepository.find({
      where: {
        projectId: project.id
      }
    })
    return recommendations
  }

  public async create({
    name,
    description,
    projectId,
    ruleId
  }: IRecommendationsRepositoryDTO): Promise<Recommendation> {
    return await this.ormRepository.save({
      name,
      description,
      projectId,
      ruleId
    })
  }

  public async delete(recommendation: Recommendation): Promise<void> {
    await this.ormRepository.delete(recommendation.id)
  }

  public async update(recommendation: Recommendation): Promise<void> {
    await this.ormRepository.update(recommendation.id, recommendation)
  }
}

export default RecommendationsRepository
