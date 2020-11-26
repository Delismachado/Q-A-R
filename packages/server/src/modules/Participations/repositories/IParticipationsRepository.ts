import Project from '@modules/Projects/infra/typeorm/entities/Project'
import User from '@modules/Users/infra/typeorm/entities/User'
import ICreateParticipationDTO from '../dtos/ICreateParticipationDTO'
import Participation from '../infra/typeorm/entities/Participation'

export default interface IParticipationsRepository {
  update(project: Participation): Promise<void>
  delete(project: Participation): Promise<void>
  findById(projectId: string): Promise<Participation | undefined>
  create(data: ICreateParticipationDTO): Promise<Participation>
  all(): Promise<Participation[]>
  getParticipationsByUser(user: User): Promise<Participation[]>
  findByProject(project: Project): Promise<Participation[]>
}
