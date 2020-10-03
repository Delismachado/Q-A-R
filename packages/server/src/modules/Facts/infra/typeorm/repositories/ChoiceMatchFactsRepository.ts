import { getRepository, Repository } from 'typeorm'

import { injectable } from 'tsyringe'
import IChoiceMatchFactsRepository from '@modules/Facts/repositories/IChoiceMatchFactsRepository'
import ICreateChoiceMatchFactDTO from '@modules/Facts/dtos/ICreateChoiceMatchFactDTO'
import ChoiceMatchFact from '../entities/ChoiceMatchFact'

@injectable()
class ChoiceMatchFactsRepository implements IChoiceMatchFactsRepository {
  private ormRepository: Repository<ChoiceMatchFact>

  constructor() {
    this.ormRepository = getRepository(ChoiceMatchFact)
  }

  public async create({
    name,
    question,
    type,
    value
  }: ICreateChoiceMatchFactDTO): Promise<ChoiceMatchFact> {
    return await this.ormRepository.save({
      name,
      question,
      type,
      value
    })
  }
}

export default ChoiceMatchFactsRepository
