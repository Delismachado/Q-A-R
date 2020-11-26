import { Request, Response } from 'express'

import { container } from 'tsyringe'
import ListUsersService from '@modules/Users/services/ListUsersService'
import CreateUserService from '@modules/Users/services/CreateUserService'
import { classToClass } from 'class-transformer'

interface IQueryParams {
  role?: string
}

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, role } = request.body
    const createUser = container.resolve(CreateUserService)
    const user = await createUser.execute({ email, password, role })
    return response.status(201).json(classToClass(user))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { role }: IQueryParams = request.query
    const createUser = container.resolve(ListUsersService)
    const user = await createUser.execute({ role })
    return response.status(201).json(classToClass(user))
  }
}
