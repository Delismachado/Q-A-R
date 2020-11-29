/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IParticipationsRepository from '../repositories/IParticipationsRepository'
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'

import AppError from '@shared/errors/AppError'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import Question from '@modules/Questions/infra/typeorm/entities/Question'
import Recommendation from '@modules/Recommendations/infra/typeorm/entities/Recommendation'

interface NextQuestionData {
  type: string
  question?: Question
  recommendations?: Recommendation
}

@injectable()
class NextQuestionService {
  constructor(
    @inject('ParticipationsRepository')
    private participationsRepository: IParticipationsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute(participationId: string): Promise<NextQuestionData> {
    const participation = await this.participationsRepository.findById(
      participationId
    )
    if (!participation) {
      throw new AppError('Participation not found!')
    }

    const project = await this.projectsRepository.findById(
      participation.projectId
    )
    if (!project) {
      throw new AppError('Project not found!')
    }

    const questions = await this.questionsRepository.findByProject(project)
    const idx = Math.floor(Math.random() * questions.length)

    return {
      type: 'Question',
      question: questions[idx]
    }
  }
}

export default NextQuestionService
