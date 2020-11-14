import { Request, Response } from 'express'

import { container } from 'tsyringe'
import CreateParticipationService from '@modules/Participations/services/CreateParticipationService'
import ListParticipationsService from '@modules/Participations/services/ListParticipationService'
import GetParticipationService from '@modules/Participations/services/GetParticipationService'
import DeleteParticipationService from '@modules/Participations/services/DeleteParticipationService'
import UpdateParticipationService from '@modules/Participations/services/UpdateParticipationService'

class ParticipationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, projectId } = request.body
    const createParticipations = container.resolve(CreateParticipationService)
    const participation = await createParticipations.execute({
      userId,
      projectId
    })
    return response.status(201).json(participation)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listParticipations = container.resolve(ListParticipationsService)
    const participations = await listParticipations.execute()
    return response.status(201).json(participations)
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { participationId } = request.params
    const getParticipation = container.resolve(GetParticipationService)
    const participation = await getParticipation.execute(participationId)
    return response.status(201).json(participation)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { participationId } = request.params
    const deleteParticipation = container.resolve(DeleteParticipationService)
    const participation = await deleteParticipation.execute(participationId)
    return response.status(201).json(participation)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { participationId } = request.params
    const data = request.body
    const getParticipation = container.resolve(UpdateParticipationService)
    const participation = await getParticipation.execute(participationId, data)
    return response.status(201).json(participation)
  }
}

export default ParticipationsController
