import { getRepository, Repository } from 'typeorm'

import Question from '../entities/Question'
import { injectable } from 'tsyringe'
import ChoicesQuestion from '../entities/ChoicesQuestion'
import IChoicesQuestionsRepository from '@modules/Questions/repositories/IChoicesQuestionsRepository'
import ICreateChoicesQuestionDTO from '@modules/Questions/dtos/ICreateChoicesQuestionDTO'

@injectable()
class ChoicesQuestionsRepository implements IChoicesQuestionsRepository {
  private ormRepository: Repository<ChoicesQuestion>

  constructor() {
    this.ormRepository = getRepository(ChoicesQuestion)
  }

  public async create({
    name,
    description,
    type,
    options,
    project
  }: ICreateChoicesQuestionDTO): Promise<Question> {
    const question = await this.ormRepository.save({
      name,
      description,
      type,
      options,
      project
    })
    return question
  }
}

export default ChoicesQuestionsRepository
