import ICreateNumericIntervalFactDTO from '../dtos/ICreateNumericIntervalFactDTO'
import NumericIntervalFact from '../infra/typeorm/entities/NumericIntervalFact'

interface INumericIntervalFactsRepository {
  create(fact: ICreateNumericIntervalFactDTO): Promise<NumericIntervalFact>
}

export default INumericIntervalFactsRepository
