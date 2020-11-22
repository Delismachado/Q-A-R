import { getRepository, Repository } from 'typeorm'

import IQuestionsRepository from '../../../repositories/IQuestionsRepository'
import ICreateQuestionDTO from '../../../dtos/ICreateQuestionDTO'
import Question from '../entities/Question'
import { injectable } from 'tsyringe'
import Project from '@modules/Projects/infra/typeorm/entities/Project'

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
    project
  }: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create({
      name,
      description,
      type,
      options,
      project
    })
    await this.ormRepository.save(question)
    return question
  }

  public async findByProject(project: Project): Promise<Question[]> {
    const question = await this.ormRepository.find({
      where: {
        project
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

  public async update(
    questionId: string,
    data: ICreateQuestionDTO
  ): Promise<void> {
    this.ormRepository.update(questionId, data)
  }

  public async delete(question: Question): Promise<void> {
    this.ormRepository.delete(question.id)
  }
}

export default QuestionsRepository
