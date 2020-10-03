/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IProjectsRepository from '../repositories/IProjectsRepository'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import Question from '@modules/Questions/infra/typeorm/entities/Question'
import AppError from '@shared/errors/AppError'

@injectable()
class ListProjectQuestions {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository
  ) {}

  public async execute(projectId: string): Promise<Question[]> {
    const project = await this.projectsRepository.findById(projectId)

    if (!project) {
      throw new AppError('Questions set not found!')
    }

    const questions = await this.questionsRepository.findByProject(project)
    return questions
  }
}

export default ListProjectQuestions
