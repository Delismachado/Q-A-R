import Project from '@modules/Projects/infra/typeorm/entities/Project'
import ICreateFactDTO from '../dtos/ICreateFactDTO'
import Fact from '../infra/typeorm/entities/Fact'

export default interface IFactsRepository {
  all(): Promise<Fact[]>
  create(data: ICreateFactDTO): Promise<Fact>
  findById(factId: string): Promise<Fact | undefined>
  findByProject(project: Project): Promise<Fact[]>
  delete(fact: Fact): Promise<void>
  update(fact: Fact): Promise<void>
}
