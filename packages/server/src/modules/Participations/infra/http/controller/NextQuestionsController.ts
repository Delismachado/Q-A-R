import NextQuestionService from '@modules/Participations/services/NextQuestionService'
import { Request, Response } from 'express'

import { container } from 'tsyringe'

class NextQuestionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const participationId = request.query.participationId as string
    const nextQuestionService = container.resolve(NextQuestionService)
    const nextQuestion = await nextQuestionService.execute(participationId)
    return await response.status(200).json(nextQuestion)
  }
}

export default NextQuestionController
