import Project from '@modules/Projects/infra/typeorm/entities/Project'
import Recommendation from '../infra/typeorm/entities/Recommendation'
import ICreateRecommendationDTO from '../dtos/ICreateRecommendationDTO'

interface IRecommendationsRepository {
  all(): Promise<Recommendation[]>
  findById(recommendationId: string): Promise<Recommendation | undefined>
  findByProject(project: Project): Promise<Recommendation[]>
  create(data: ICreateRecommendationDTO): Promise<Recommendation>
  delete(recommendation: Recommendation): Promise<void>
  update(recommendation: Recommendation): Promise<void>
}

export default IRecommendationsRepository
