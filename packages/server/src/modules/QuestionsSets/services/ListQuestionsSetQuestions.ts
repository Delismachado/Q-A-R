/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IQuestionsSetsRepository from '../repositories/IQuestionsSetsRepository'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import Question from '@modules/Questions/infra/typeorm/entities/Question'
import AppError from '@shared/errors/AppError'

@injectable()
class ListQuestionsSetQuestions {
  constructor(
    @inject('QuestionsSetsRepository')
    private questionsSetsRepository: IQuestionsSetsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute(questionSetId: string): Promise<Question[]> {
    const questionsSet = await this.questionsSetsRepository.findById(
      questionSetId
    )

    if (!questionsSet) {
      throw new AppError('Questions set not found!')
    }

    const questions = await this.questionsRepository.findByQuestionSet(
      questionsSet
    )
    return questions
  }
}

export default ListQuestionsSetQuestions
