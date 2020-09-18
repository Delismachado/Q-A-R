import { UserRole } from '@modules/Users/infra/typeorm/entities/User'

export default interface ICreateUserDTO {
  email: string
  password: string
  role: UserRole
}
