import Participation from '@modules/Participations/infra/typeorm/entities/Participation'
import IParticipationsRepository from '@modules/Participations/repositories/IParticipationsRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import IUsersRepository from '../repositories/IUsersRepository'

@injectable()
class ListUserParticipationsService {
  // eslint-disable-next-line no-useless-constructor
  public constructor(
    @inject('ParticipationsRepository')
    private participationsRepository: IParticipationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(userId: string): Promise<Participation[]> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found!')
    }
    const projects = await this.participationsRepository.getParticipationsByUser(
      user
    )
    return projects
  }
}

export default ListUserParticipationsService
