import { getRepository, Repository } from 'typeorm'
import { injectable } from 'tsyringe'
import IRecomendationsRepositoryDTO from '@modules/Recomendations/dtos/ICreateRecomendationDTO'
import IRecomendationsRepository from '@modules/Recomendations/repositories/IRecomendationsRepository'
import Recomendation from '../entities/Recomendation'
import Project from '@modules/Projects/infra/typeorm/entities/Project'

@injectable()
class RecomendationsRepository implements IRecomendationsRepository {
  private ormRepository: Repository<Recomendation>

  constructor() {
    this.ormRepository = getRepository(Recomendation)
  }

  public async all(): Promise<Recomendation[]> {
    const recomendations = await this.ormRepository.find()
    return recomendations
  }

  public async findById(
    recomendationId: string
  ): Promise<Recomendation | undefined> {
    const recomendation = await this.ormRepository.findOne(recomendationId)
    return recomendation
  }

  public async findByProject(project: Project): Promise<Recomendation[]> {
    const recomendations = await this.ormRepository
      .createQueryBuilder('recomendations')
      .innerJoinAndSelect('recomendations.question', 'question')
      .innerJoinAndSelect('question.project', 'project')
      .where('project.id = :projectId', { projectId: project.id })
      .getMany()
    return recomendations
  }

  public async create({
    name,
    description,
    projectId
  }: IRecomendationsRepositoryDTO): Promise<Recomendation> {
    return await this.ormRepository.save({ name, description, projectId })
  }

  public async delete(recomendation: Recomendation): Promise<void> {
    await this.ormRepository.delete(recomendation.id)
  }

  public async update(recomendation: Recomendation): Promise<void> {
    await this.ormRepository.update(recomendation.id, recomendation)
  }
}

export default RecomendationsRepository
