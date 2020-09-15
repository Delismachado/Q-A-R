import { getRepository, Repository } from 'typeorm'

import IQuestionsSetsRepository from '../../../repositories/IQuestionsSetsRepository'
import ICreateQuestionSetsDTO from '../../../dtos/ICreateQuestionsSetDTO'
import QuestionsSet from '../entities/QuestionsSet'
import { injectable } from 'tsyringe'

@injectable()
class QuestionsSetsRepository implements IQuestionsSetsRepository {
  private ormRepository: Repository<QuestionsSet>

  constructor() {
    this.ormRepository = getRepository(QuestionsSet)
  }

  public async create({ name }: ICreateQuestionSetsDTO): Promise<QuestionsSet> {
    const questionSet = this.ormRepository.create({
      name
    })
    await this.ormRepository.save(questionSet)
    return questionSet
  }

  public async findById(
    questions_set_id: string
  ): Promise<QuestionsSet | undefined> {
    const questionSet = await this.ormRepository.findOne(questions_set_id)
    return questionSet
  }

  public async all(): Promise<QuestionsSet[]> {
    const questionsSets = await this.ormRepository.find()
    return questionsSets
  }
}

export default QuestionsSetsRepository
