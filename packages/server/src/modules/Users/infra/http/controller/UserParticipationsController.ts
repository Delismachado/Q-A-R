import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListUserParticipationsService from '@modules/Users/services/ListUserParticipationsService'
import { classToClass } from 'class-transformer'

class UserParticipationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params
    const listUserParticipationsService = container.resolve(
      ListUserParticipationsService
    )
    const participations = await listUserParticipationsService.execute(user_id)
    return response.status(200).json(classToClass(participations))
  }
}

export default UserParticipationsController
