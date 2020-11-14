/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IFactsRepository from '../repositories/IFactsRepository'
import Fact from '../infra/typeorm/entities/Fact'

@injectable()
class ListFactsService {
  constructor(
    @inject('FactsRepository')
    private factsRepository: IFactsRepository
  ) {}

  public async execute(): Promise<Fact[]> {
    const facts = await this.factsRepository.all()
    if (!facts) {
      throw new AppError('Fact not found!')
    }
    return facts
  }
}

export default ListFactsService
