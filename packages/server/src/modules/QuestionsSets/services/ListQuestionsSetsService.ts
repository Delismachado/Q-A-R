/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import QuestionsSet from '../infra/typeorm/entities/QuestionsSet'
import IQuestionsSetsRepository from '../repositories/IQuestionsSetsRepository'

@injectable()
class ListQuestionsSetsService {
  constructor(
    @inject('QuestionsSetsRepository')
    private questionsSetsRepository: IQuestionsSetsRepository
  ) {}

  public async execute(): Promise<QuestionsSet[]> {
    const questionsSets = await this.questionsSetsRepository.all()
    return questionsSets
  }
}

export default ListQuestionsSetsService
