import { getRepository, Repository } from 'typeorm'

import IParticipationsRepository from '../../../repositories/IParticipationsRepository'
import ICreateParticipationSetsDTO from '../../../dtos/ICreateParticipationDTO'
import Participation from '@modules/Participations/infra/typeorm/entities/Participation'
import { injectable } from 'tsyringe'
import User from '@modules/Users/infra/typeorm/entities/User'
import Project from '@modules/Projects/infra/typeorm/entities/Project'

@injectable()
class ParticipationsRepository implements IParticipationsRepository {
  private ormRepository: Repository<Participation>

  constructor() {
    this.ormRepository = getRepository(Participation)
  }

  public async create({
    userId,
    projectId
  }: ICreateParticipationSetsDTO): Promise<Participation> {
    const participationSet = this.ormRepository.create({
      userId,
      projectId
    })
    await this.ormRepository.save(participationSet)
    return participationSet
  }

  public async findById(
    participationId: string
  ): Promise<Participation | undefined> {
    const participationSet = await this.ormRepository.findOne(participationId)
    return participationSet
  }

  public async all(): Promise<Participation[]> {
    const participations = await this.ormRepository.find()
    return participations
  }

  public async update(participation: Participation): Promise<void> {
    await this.ormRepository.update(participation.id, {
      projectId: participation.projectId,
      userId: participation.userId
    })
  }

  public async delete(participation: Participation): Promise<void> {
    await this.ormRepository.delete(participation.id)
  }

  public async getParticipationsByUser(user: User): Promise<Participation[]> {
    return await this.ormRepository.find({
      where: {
        userId: user.id
      }
    })
  }

  public async findByProject(project: Project): Promise<Participation[]> {
    return await this.ormRepository.find({
      where: {
        projectId: project.id
      }
    })
  }
}

export default ParticipationsRepository
