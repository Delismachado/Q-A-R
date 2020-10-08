/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'
import IRecomendationsRepository from '@modules/Recomendations/repositories/IRecomendationsRepository'
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'
import AppError from '@shared/errors/AppError'
import Recomendation from '../infra/typeorm/entities/Recomendation'

interface IRequest {
  name: string
  description: string
  projectId: string
}

@injectable()
class CreateRecomendationService {
  constructor(
    @inject('RecomendationsRepository')
    private recomendationsRepository: IRecomendationsRepository,
    @inject('ProjectsRepository')
    private ProjectsRepository: IProjectsRepository
  ) {}

  public async execute({
    name,
    description,
    projectId
  }: IRequest): Promise<Recomendation> {
    const project = await this.ProjectsRepository.findById(projectId)

    if (!project) {
      throw new AppError('Recomendation not found!')
    }

    const recomendation = await this.recomendationsRepository.create({
      name,
      description,
      projectId
    })
    return recomendation
  }
}

export default CreateRecomendationService
