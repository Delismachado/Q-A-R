/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IQuestionsSetsRepository from '../repositories/IQuestionsSetsRepository'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import Question from '@modules/Questions/infra/typeorm/entities/Question'

@injectable()
class ListQuestionsSetQuestions {
  constructor(
    @inject('QuestionsSetsRepository')
    private questionsSetsRepository: IQuestionsSetsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute(questionSetId: string): Promise<Question[]> {
    const questions = await this.questionsRepository.findByQuestionSetId(
      questionSetId
    )
    return questions
  }
}

export default ListQuestionsSetQuestions
