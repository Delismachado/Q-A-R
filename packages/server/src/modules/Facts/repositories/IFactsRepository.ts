import Project from '@modules/Projects/infra/typeorm/entities/Project'
import Fact from '../infra/typeorm/entities/Fact'

interface IFactsRepository {
  all(): Promise<Fact[]>
  findById(factId: string): Promise<Fact | undefined>
  findByProject(project: Project): Promise<Fact[]>
  delete(fact: Fact): Promise<void>
  update(fact: Fact): Promise<void>
}

export default IFactsRepository
