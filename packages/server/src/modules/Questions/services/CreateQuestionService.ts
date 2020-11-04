/* eslint-disable no-useless-constructor */

import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import Question from '../infra/typeorm/entities/Question'
import IChoicesQuestionsRepository from '../repositories/IChoicesQuestionsRepository'
import IMultipleChoicesQuestionsRepository from '../repositories/IMultipleChoicesQuestionsRepository'
import INumericQuestionsRepository from '../repositories/INumericQuestionsRepository'
import ITrueFalseQuestionsRepository from '../repositories/ITrueFalseQuestionsRepository'

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
    @inject('TrueFalseQuestionsRepository')
    private trueFalseQuestionsRepository: ITrueFalseQuestionsRepository,
    @inject('ChoicesQuestionsRepository')
    private choicesQuestionsRepository: IChoicesQuestionsRepository,
    @inject('MultipleChoicesQuestionsRepository')
    private multipleChoicesQuestionsRepository: IMultipleChoicesQuestionsRepository,
    @inject('NumericQuestionsRepository')
    private numericQuestionsRepository: INumericQuestionsRepository,
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
      throw new AppError('Project not found!')
    }

    const question = {
      name,
      description,
      type,
      options,
      project
    }

    switch (type) {
      case 'TrueFalseQuestion':
        return this.trueFalseQuestionsRepository.create({ ...question })
      case 'ChoicesQuestion':
        return this.choicesQuestionsRepository.create({ ...question })
      case 'MultipleChoicesQuestion':
        return this.multipleChoicesQuestionsRepository.create({ ...question })
      case 'NumericQuestion':
        return this.numericQuestionsRepository.create({ ...question })
      default:
        throw new AppError('Unknown question type ' + type)
    }
  }
}

export default CreateQuestionService
