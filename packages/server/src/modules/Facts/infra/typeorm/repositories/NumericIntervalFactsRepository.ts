/* eslint-disable indent */
import { getRepository, Repository } from 'typeorm'
import { injectable } from 'tsyringe'
import INumericIntervalFactsRepository from '@modules/Facts/repositories/INumericIntervalFactsRepository'
import ICreateNumericIntervalFactDTO from '@modules/Facts/dtos/ICreateNumericIntervalFactDTO'
import NumericIntervalFact from '../entities/NumericIntervalFact'

@injectable()
class NumericIntervalFactsRepository
  implements INumericIntervalFactsRepository {
  private ormRepository: Repository<NumericIntervalFact>

  constructor() {
    this.ormRepository = getRepository(NumericIntervalFact)
  }

  public async create({
    name,
    question,
    type,
    begin,
    end
  }: ICreateNumericIntervalFactDTO): Promise<NumericIntervalFact> {
    return await this.ormRepository.save({
      name,
      question,
      type,
      begin,
      end
    })
  }
}

export default NumericIntervalFactsRepository
