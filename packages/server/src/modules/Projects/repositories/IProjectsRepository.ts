import Fact from '@modules/Facts/infra/typeorm/entities/Fact'
import ICreateProjectDTO from '../dtos/ICreateProjectDTO'
import Project from '../infra/typeorm/entities/Project'

export default interface IProjectsRepository {
  update(project: Project): Promise<void>
  delete(project: Project): Promise<void>
  findById(projectId: string): Promise<Project | undefined>
  create(data: ICreateProjectDTO): Promise<Project>
  all(): Promise<Project[]>
  findFacts(project: Project): Promise<Fact[]>
}
