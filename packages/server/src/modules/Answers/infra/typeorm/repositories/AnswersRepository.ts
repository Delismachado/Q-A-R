import { getRepository, Repository } from 'typeorm'

import { injectable } from 'tsyringe'
import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import Answer from '../entities/Answer'
import ICreateAnswerDTO from '@modules/Answers/dtos/ICreateAnswerDTO'
import Question from '@modules/Questions/infra/typeorm/entities/Question'
import User from '@modules/Users/infra/typeorm/entities/User'

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

  public async findByQuestion(question: Question): Promise<Answer[]> {
    const answers = await this.ormRepository.find({
      where: { question }
    })
    return answers
  }

  public async findByUser(user: User): Promise<Answer[]> {
    const answers = await this.ormRepository.find({
      where: { user }
    })
    return answers
  }
}

export default AnswersRepository
