import ICreateProjectDTO from '../dtos/ICreateProjectDTO'
import Project from '../infra/typeorm/entities/Project'

export default interface IProjectsRepository {
  update(project: Project): Promise<void>
  delete(project: Project): Promise<void>
  findById(projectId: string): Promise<Project | undefined>
  create(data: ICreateProjectDTO): Promise<Project>
  all(): Promise<Project[]>
}
