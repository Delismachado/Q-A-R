import { getRepository, Repository } from 'typeorm'

import Question from '../entities/Question'
import { injectable } from 'tsyringe'
import MultipleChoicesQuestion from '../entities/MultipleChoicesQuestion'
import IMultipleChoicesQuestionsRepository from '@modules/Questions/repositories/IMultipleChoicesQuestionsRepository'
import ICreateMultipleChoicesQuestionDTO from '@modules/Questions/dtos/ICreateMultipleChoicesQuestionDTO'

@injectable()
// eslint-disable-next-line prettier/prettier
class MultipleChoicesQuestionsRepository implements IMultipleChoicesQuestionsRepository {
  private ormRepository: Repository<MultipleChoicesQuestion>

  constructor() {
    this.ormRepository = getRepository(MultipleChoicesQuestion)
  }

  public async create({
    name,
    description,
    type,
    options,
    project
  }: ICreateMultipleChoicesQuestionDTO): Promise<Question> {
    const question = this.ormRepository.save({
      name,
      description,
      type,
      options,
      project
    })
    return question
  }
}

export default MultipleChoicesQuestionsRepository
