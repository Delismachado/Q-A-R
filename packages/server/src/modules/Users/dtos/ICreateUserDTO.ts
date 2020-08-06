export default interface ICreateUserDTO {
  email: string
  password: string
  role: 'user' | 'admin'
}
