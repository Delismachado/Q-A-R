import { getRepository, Repository } from 'typeorm'

import { injectable } from 'tsyringe'
import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import Answer from '../entities/Answer'
import ICreateAnswerDTO from '@modules/Answers/dtos/ICreateAnswerDTO'

@injectable()
class AnswersRepository implements IAnswersRepository {
  private ormRepository: Repository<Answer>

  constructor() {
    this.ormRepository = getRepository(Answer)
  }

  public async create({
    user,
    question,
    value
  }: ICreateAnswerDTO): Promise<Answer> {
    const answer = this.ormRepository.create({
      user,
      question,
      value
    })
    await this.ormRepository.save(answer)
    return answer
  }

  public async all(): Promise<Answer[]> {
    const answers = await this.ormRepository.find()
    return answers
  }
}

export default AnswersRepository
