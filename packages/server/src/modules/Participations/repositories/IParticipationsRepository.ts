import ICreateParticipationDTO from '../dtos/ICreateParticipationDTO'
import Participation from '../infra/typeorm/entities/Participation'

export default interface IParticipationsRepository {
  update(project: Participation): Promise<void>
  delete(project: Participation): Promise<void>
  findById(projectId: string): Promise<Participation | undefined>
  create(data: ICreateParticipationDTO): Promise<Participation>
  all(): Promise<Participation[]>
}
