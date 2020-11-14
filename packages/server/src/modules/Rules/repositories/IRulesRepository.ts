import Project from '@modules/Projects/infra/typeorm/entities/Project'
import Rule from '../infra/typeorm/entities/Rule'

interface IRulesRepository {
  all(): Promise<Rule[]>
  findById(rule_id: string): Promise<Rule | undefined>
  findByProject(project: Project): Promise<Rule[]>
}

export default IRulesRepository
