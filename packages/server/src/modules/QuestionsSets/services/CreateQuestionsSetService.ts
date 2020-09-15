/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import QuestionsSet from '../infra/typeorm/entities/QuestionsSet'
import IQuestionsSetsRepository from '../repositories/IQuestionsSetsRepository'

interface IRequest {
  name: string
}

@injectable()
class CreateQuestionsSetService {
  constructor(
    @inject('QuestionsSetsRepository')
    private questionsSetsRepository: IQuestionsSetsRepository
  ) {}

  public async execute({ name }: IRequest): Promise<QuestionsSet> {
    const question = await this.questionsSetsRepository.create({
      name
    })
    return question
  }
}

export default CreateQuestionsSetService
