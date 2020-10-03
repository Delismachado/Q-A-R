/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IFactsRepository from '../repositories/IFactsRepository'
import Fact from '../infra/typeorm/entities/Fact'

@injectable()
class GetFactService {
  constructor(
    @inject('FactsRepository')
    private factsRepository: IFactsRepository
  ) {}

  public async execute(factId: string): Promise<Fact> {
    const fact = await this.factsRepository.findById(factId)
    if (!fact) {
      throw new AppError('Fact not found!')
    }
    return fact
  }
}

export default GetFactService
