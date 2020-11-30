/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe'

import IParticipationsRepository from '../repositories/IParticipationsRepository'
import IProjectsRepository from '@modules/Projects/repositories/IProjectsRepository'

import AppError from '@shared/errors/AppError'
import IQuestionsRepository from '@modules/Questions/repositories/IQuestionsRepository'
import Question from '@modules/Questions/infra/typeorm/entities/Question'
import Recommendation from '@modules/Recommendations/infra/typeorm/entities/Recommendation'
import IAnswersRepository from '@modules/Answers/repositories/IAnswersRepository'
import IFactsRepository from '@modules/Facts/repositories/IFactsRepository'
import IRulesRepository from '@modules/Rules/repositories/IRulesRepository'
import Participation from '../infra/typeorm/entities/Participation'
import Project from '@modules/Projects/infra/typeorm/entities/Project'
import Answer from '@modules/Answers/infra/typeorm/entities/Answer'
import IRecommendationsRepository from '@modules/Recommendations/repositories/IRecommendationsRepository'

interface NextQuestionData {
  type: string
  question?: Question
  recommendation?: Recommendation
}

@injectable()
class NextQuestionService {
  constructor(
    @inject('ParticipationsRepository')
    private participationsRepository: IParticipationsRepository,
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
    @inject('FactsRepository')
    private factsRepository: IFactsRepository,
    @inject('RulesRepository')
    private rulesRepository: IRulesRepository,
    @inject('RecommendationsRepository')
    private recommendationsRepository: IRecommendationsRepository
  ) {}

  public async infer(
    answers: Answer[],
    project: Project
  ): Promise<Recommendation | undefined> {
    // const rules = await this.rulesRepository.findByProject(project)
    const recommendations = await this.recommendationsRepository.findByProject(
      project
    )
    for (const recommendation of recommendations) {
      const rule = await this.rulesRepository.findById(recommendation.ruleId)
      console.log(await rule?.stringExpression())
      if (!rule) {
        throw new AppError('Recommendation rule not found!')
      }
      const response = await rule.compute(answers)
      if (response) {
        return recommendation
      }
    }
    return undefined
  }

  public async execute(participationId: string): Promise<NextQuestionData> {
    const participation = await this.participationsRepository.findById(
      participationId
    )
    if (!participation) {
      throw new AppError('Participation not found!')
    }

    const project = await this.projectsRepository.findById(
      participation.projectId
    )
    if (!project) {
      throw new AppError('Project not found!')
    }

    const questions = await this.questionsRepository.findByProject(project)

    const answers = await this.answersRepository.findByParticipation(
      participation
    )

    // if there is a recommendation, return it

    if (answers.length === 0) {
      // else if it is the first answer, return a random question
      const idx = Math.floor(Math.random() * questions.length)
      return {
        type: 'Question',
        question: questions[idx]
      }
    } else {
      // else if there are answers, try to infer a recommenation
      // infer
      const newRecommendation = await this.infer(answers, project)
      // if there is a recommenation possible, return it
      if (newRecommendation) {
        return {
          type: 'Recommendation',
          recommendation: newRecommendation
        }
      } else {
        const unanseredQuestions = questions.filter(
          q => !answers.some(a => a.questionId === q.id)
        )
        const idx = Math.floor(Math.random() * unanseredQuestions.length)
        if (unanseredQuestions.length === 0) {
          const defaultRecommendation = new Recommendation()
          defaultRecommendation.name = 'No recommendation is possible!'
          return {
            type: 'Recommendation',
            recommendation: defaultRecommendation
          }
        } else {
          return {
            type: 'Question',
            question: unanseredQuestions[idx]
          }
        }
      }
    }
  }
}

export default NextQuestionService
