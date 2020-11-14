import ICreateFactDTO from './ICreateFactDTO'

export default interface ICreateNumericIntervalFactDTO extends ICreateFactDTO {
  begin: number
  end: number
}
