import Project from '@modules/Projects/infra/typeorm/entities/Project'
import Recomendation from '../infra/typeorm/entities/Recomendation'
import ICreateRecomendationDTO from '../dtos/ICreateRecomendationDTO'

interface IRecomendationsRepository {
  all(): Promise<Recomendation[]>
  findById(recomendationId: string): Promise<Recomendation | undefined>
  findByProject(project: Project): Promise<Recomendation[]>
  create(data: ICreateRecomendationDTO): Promise<Recomendation>
  delete(recomendation: Recomendation): Promise<void>
  update(recomendation: Recomendation): Promise<void>
}

export default IRecomendationsRepository
