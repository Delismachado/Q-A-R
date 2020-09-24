/* eslint-disable no-useless-constructor */

import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import Question, { QuestionType } from '../infra/typeorm/entities/Question'
import IQuestionsRepository from '../repositories/IQuestionsRepository'

interface IRequest {
  name: string
  description: string
  type: string
  options: any
  projectId: string
}

@injectable()
class CreateQuestionService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('ProjectsRepository')
    private ProjectsRepository: IProjectsRepository
  ) {}

  public async execute({
    name,
    description,
    type,
    options,
    projectId
  }: IRequest): Promise<Question> {
    const project = await this.ProjectsRepository.findById(projectId)

    if (!project) {
      throw new AppError('Question set not found!')
    }

    const question = await this.questionsRepository.create({
      name,
      description,
      type: type as QuestionType,
      options,
      project
    })

    return question
  }
}

export default CreateQuestionService
