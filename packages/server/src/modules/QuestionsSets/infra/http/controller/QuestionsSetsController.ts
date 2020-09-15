import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateQuestionsSetService from '../../../services/CreateQuestionsSetService'
import ListQuestionsSetsService from '../../../services/ListQuestionsSetsService'
import GetQuestionsSetService from '../../../services/GetQuestionsSetService'

class QuestionsSetsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body
    console.log(name)
    const createQuestionsSets = container.resolve(CreateQuestionsSetService)
    const question = await createQuestionsSets.execute({
      name
    })
    return response.status(201).json(question)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listQuestionsSets = container.resolve(ListQuestionsSetsService)
    const questions = await listQuestionsSets.execute()
    return response.status(201).json(questions)
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { questionsSetId } = request.params
    const getQuestionsSets = container.resolve(GetQuestionsSetService)
    const question = await getQuestionsSets.execute(questionsSetId)
    return response.status(201).json(question)
  }
}

export default QuestionsSetsController
