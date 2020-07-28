import { Request, Response } from 'express'

import CreateUserService from '../../../services/CreateUserSerive'

import { container } from 'tsyringe'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({ name, email })

    return response.status(201).json(user)
  }
}
