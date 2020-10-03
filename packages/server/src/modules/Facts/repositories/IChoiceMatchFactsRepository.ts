import ICreateChoiceMatchFactDTO from '../dtos/ICreateChoiceMatchFactDTO'
import ChoiceMatchFact from '../infra/typeorm/entities/ChoiceMatchFact'

interface IChoiceMatchFactsRepository {
  create(fact: ICreateChoiceMatchFactDTO): Promise<ChoiceMatchFact>
}

export default IChoiceMatchFactsRepository
