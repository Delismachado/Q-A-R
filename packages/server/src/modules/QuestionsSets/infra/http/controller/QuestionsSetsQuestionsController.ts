import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateQuestionsSetService from '../../../services/CreateQuestionsSetService'
import ListQuestionsSetsService from '../../../services/ListQuestionsSetsService'
import GetQuestionsSetService from '../../../services/GetQuestionsSetService'
import ListQuestionsSetQuestions from '@modules/QuestionsSets/services/ListQuestionsSetQuestions'

class QuestionsSetsQuestionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { questionsSetId } = request.params
    console.log(request.params)
    const listQuestionsSetQuestions = container.resolve(
      ListQuestionsSetQuestions
    )
    const questions = await listQuestionsSetQuestions.execute(questionsSetId)
    return response.status(201).json(questions)
  }
}

export default QuestionsSetsQuestionsController
