/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import Question from '../infra/typeorm/entities/Question'
import IQuestionsRepository from '../repositories/IQuestionsRepository'
import AppError from '@shared/errors/AppError'
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'

interface IRequest {
  name: string
  description: string
  type: string
  options: any
  projectId: string
}

@injectable()
class UpdateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute(
    questionId: string,
    { name, description, type, options, projectId }: IRequest
  ): Promise<Question> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new AppError('Question not found')
    }
    const project = await this.projectsRepository.findById(projectId)
    if (!project) {
      throw new AppError('Project not found')
    }
    await this.questionsRepository.update(question.id, {
      name,
      description,
      type,
      options,
      project
    })
    const updatedQuestion = await this.questionsRepository.findById(questionId)
    if (!updatedQuestion) {
      throw new AppError('Question not found')
    }
    return updatedQuestion
  }
}

export default UpdateQuestionService
