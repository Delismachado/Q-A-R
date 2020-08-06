/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Question from '../infra/typeorm/entities/Question'
import IQuestionsRepository from '../repositories/IQuestionsRepository'

@injectable()
class ListQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute(): Promise<Question[]> {
    const question = await this.questionsRepository.all()
    return question
  }
}

export default ListQuestionsService
