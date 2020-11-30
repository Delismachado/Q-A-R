import { getRepository, Repository } from 'typeorm'

import { injectable } from 'tsyringe'
import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import Answer from '../entities/Answer'
import ICreateAnswerDTO from '@modules/Answers/dtos/ICreateAnswerDTO'
import Question from '@modules/Questions/infra/typeorm/entities/Question'
import Participation from '@modules/Participations/infra/typeorm/entities/Participation'

@injectable()
class AnswersRepository implements IAnswersRepository {
  private ormRepository: Repository<Answer>

  constructor() {
    this.ormRepository = getRepository(Answer)
  }

  public async create({
    participation,
    question,
    values
  }: ICreateAnswerDTO): Promise<Answer> {
    const answer = this.ormRepository.create({
      participation,
      question,
      values
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
      where: { question },
      relations: ['participation']
    })
    return answers
  }

  public async findByParticipation(
    participation: Participation
  ): Promise<Answer[]> {
    const answers = await this.ormRepository.find({
      where: { participation },
      relations: ['question']
    })
    return answers
  }
}

export default AnswersRepository
