import {
  getRepository,
  getTreeRepository,
  Repository,
  TreeRepository
} from 'typeorm'

import IRulesRepository from '../../../repositories/IRulesRepository'
import ICreateRuleDTO from '../../../dtos/ICreateRuleDTO'
import { injectable } from 'tsyringe'
import Rule from '../entities/Rule'
import Project from '@modules/Projects/infra/typeorm/entities/Project'
import { threadId } from 'worker_threads'

interface ICreateRuleDTORecursive extends ICreateRuleDTO {
  nextRule: Rule
}

@injectable()
class RulesRepository implements IRulesRepository {
  private ormRepository: Repository<Rule>
  private treeRepository: TreeRepository<Rule>

  constructor() {
    this.ormRepository = getRepository(Rule)
    this.treeRepository = getTreeRepository(Rule)
  }

  public async findById(ruleId: string): Promise<Rule | undefined> {
    const rule = await this.ormRepository.findOne(ruleId)
    if (rule) {
      await this.treeRepository.findDescendantsTree(rule)
    }
    return rule
  }

  public async all(): Promise<Rule[]> {
    const rules = await this.ormRepository.find()
    return rules
  }

  public async findByProject(project: Project): Promise<Rule[]> {
    const parentRules = await this.ormRepository.find({
      where: {
        projectId: project.id,
        parent: null
      }
    })
    for (const pr of parentRules) {
      await this.treeRepository.findDescendantsTree(pr)
    }
    return parentRules
  }

  public async delete(rule: Rule): Promise<Rule> {
    await Promise.all(rule.operands.map(r => this.delete(r)))
    await this.treeRepository.remove(rule)
    return rule
  }
}

export default RulesRepository
