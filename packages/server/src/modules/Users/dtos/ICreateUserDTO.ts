export default interface ICreateUserDTO {
  name: string
  email: string
  role: 'user' | 'admin'
}
