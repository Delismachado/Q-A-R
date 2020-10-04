import Rule from '../infra/typeorm/entities/Rule'

export default interface IRulesRepository {
  findById(Rule_id: string): Promise<Rule | undefined>
  all(): Promise<Rule[]>
}
