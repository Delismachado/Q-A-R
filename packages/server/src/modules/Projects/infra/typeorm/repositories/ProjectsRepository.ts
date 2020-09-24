import { getRepository, Repository } from 'typeorm'

import IProjectsRepository from '../../../repositories/IProjectsRepository'
import ICreateQuestionSetsDTO from '../../../dtos/ICreateProjectDTO'
import Project from '../entities/Project'
import { injectable } from 'tsyringe'

@injectable()
class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>

  constructor() {
    this.ormRepository = getRepository(Project)
  }

  public async create({ name }: ICreateQuestionSetsDTO): Promise<Project> {
    const questionSet = this.ormRepository.create({
      name
    })
    await this.ormRepository.save(questionSet)
    return questionSet
  }

  public async findById(projectId: string): Promise<Project | undefined> {
    const questionSet = await this.ormRepository.findOne(projectId)
    return questionSet
  }

  public async all(): Promise<Project[]> {
    const projects = await this.ormRepository.find()
    return projects
  }

  public async update(project: Project): Promise<void> {
    await this.ormRepository.update(project.id, project)
  }

  public async delete(project: Project): Promise<void> {
    await this.ormRepository.delete(project.id)
  }
}

export default ProjectsRepository
