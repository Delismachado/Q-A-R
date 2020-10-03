import { getRepository, Repository } from 'typeorm'

import { injectable } from 'tsyringe'
import IFactsRepository from '@modules/Facts/repositories/IFactsRepository'
import Fact from '../entities/Fact'
import Project from '@modules/Projects/infra/typeorm/entities/Project'

@injectable()
class FactsRepository implements IFactsRepository {
  private ormRepository: Repository<Fact>

  constructor() {
    this.ormRepository = getRepository(Fact)
  }

  public async all(): Promise<Fact[]> {
    const facts = await this.ormRepository.find()
    return facts
  }

  public async findById(factId: string): Promise<Fact | undefined> {
    const fact = await this.ormRepository.findOne(factId)
    return fact
  }

  public async findByProject(project: Project): Promise<Fact[]> {
    const facts = await this.ormRepository
      .createQueryBuilder('fact')
      .innerJoinAndSelect('fact.question', 'question')
      .innerJoinAndSelect('question.project', 'project')
      .where('project.id = :projectId', { projectId: project.id })
      .getMany()
    return facts
  }

  public async delete(fact: Fact): Promise<void> {
    await this.ormRepository.delete(fact.id)
  }

  public async update(fact: Fact): Promise<void> {
    await this.ormRepository.update(fact.id, fact)
  }
}

export default FactsRepository
