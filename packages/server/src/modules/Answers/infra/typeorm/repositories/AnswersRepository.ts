import { getRepository, Repository } from 'typeorm'

import { injectable } from 'tsyringe'
import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import Answer from '../entities/Answer'
import ICreateAnswerDTO from '@modules/Answers/dtos/ICreateAnswerDTO'
import IListAnswersDTO from '@modules/Answers/dtos/IListAnswersDTO'
import IListByUserDTO from '@modules/Answers/dtos/IListByUserDTO'
import Question from '@modules/Questions/infra/typeorm/entities/Question'

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

  public async findByUser(data: IListByUserDTO): Promise<Answer[]> {
    const answers = await this.ormRepository.find({
      where: {
        user: data.user
      }
    })
    return answers
  }
}

export default AnswersRepository
