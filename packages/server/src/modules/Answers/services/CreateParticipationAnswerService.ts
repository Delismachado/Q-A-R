/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'

import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import Answer from '@modules/Answers/infra/typeorm/entities/Answer'
import IParticipationsRepository from '../../Participations/repositories/IParticipationsRepository'

interface IRequest {
  participationId: string
  questionId: string
  values: any
}

@injectable()
class CreateParticipationAnswerService {
  constructor(
    @inject('ParticipationsRepository')
    private participationsRepository: IParticipationsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository
  ) {}

  public async execute({
    participationId,
    questionId,
    values
  }: IRequest): Promise<Answer> {
    const participation = await this.participationsRepository.findById(
      participationId
    )
    if (!participation) {
      throw new AppError('User participation not found', 401)
    }

    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new AppError('Question not found', 401)
    }

    const answer = this.answersRepository.create({
      question,
      participation,
      values
    })

    return answer
  }
}

export default CreateParticipationAnswerService
