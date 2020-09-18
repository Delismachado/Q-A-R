import { getRepository, Repository } from 'typeorm'

import IQuestionsRepository from '../../../repositories/IQuestionsRepository'
import ICreateQuestionDTO from '../../../dtos/ICreateQuestionDTO'
import Question from '../entities/Question'
import { injectable } from 'tsyringe'

@injectable()
class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Repository<Question>

  constructor() {
    this.ormRepository = getRepository(Question)
  }

  public async create({
    name,
    description,
    type,
    options,
    questionsSet
  }: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create({
      name,
      description,
      type,
      options,
      questionsSet
    })
    await this.ormRepository.save(question)
    return question
  }

  public async findByQuestionSet(questionsSet: string): Promise<Question[]> {
    const question = await this.ormRepository.find({
      where: {
        questionsSet
      }
    })
    return question
  }

  public async findById(questionId: string): Promise<Question | undefined> {
    const question = await this.ormRepository.findOne(questionId)
    return question
  }

  public async all(): Promise<Question[]> {
    const questions = await this.ormRepository.find()
    return questions
  }
}

export default QuestionsRepository
