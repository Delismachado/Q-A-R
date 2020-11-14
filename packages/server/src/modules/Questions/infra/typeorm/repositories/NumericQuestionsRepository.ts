import { getRepository, Repository } from 'typeorm'

import Question from '../entities/Question'
import { injectable } from 'tsyringe'
import NumericQuestion from '../entities/NumericQuestion'
import INumericQuestionsRepository from '@modules/Questions/repositories/INumericQuestionsRepository'
import ICreateNumericQuestionDTO from '@modules/Questions/dtos/ICreateNumericQuestionDTO'

@injectable()
class NumericQuestionsRepository implements INumericQuestionsRepository {
  private ormRepository: Repository<NumericQuestion>

  constructor() {
    this.ormRepository = getRepository(NumericQuestion)
  }

  public async create({
    name,
    description,
    type,
    options,
    project
  }: ICreateNumericQuestionDTO): Promise<Question> {
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

export default NumericQuestionsRepository
