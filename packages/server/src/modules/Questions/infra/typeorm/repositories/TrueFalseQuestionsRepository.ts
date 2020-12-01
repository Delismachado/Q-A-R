import { getRepository, Repository } from 'typeorm'

import Question from '../entities/Question'
import { injectable } from 'tsyringe'
import TrueFalseQuestion from '../entities/TrueFalseQuestion'
import ITrueFalseQuestionsRepository from '@modules/Questions/repositories/ITrueFalseQuestionsRepository'
import ICreateTrueFalseQuestionDTO from '@modules/Questions/dtos/ICreateTrueFalseQuestionDTO'

@injectable()
class TrueFalseQuestionsRepository implements ITrueFalseQuestionsRepository {
  private ormRepository: Repository<TrueFalseQuestion>

  constructor() {
    this.ormRepository = getRepository(TrueFalseQuestion)
  }

  public async create({
    name,
    description,
    type,
    options,
    project
  }: ICreateTrueFalseQuestionDTO): Promise<Question> {
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

export default TrueFalseQuestionsRepository
