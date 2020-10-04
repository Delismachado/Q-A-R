import { ChildEntity } from 'typeorm'
import Rule from './Rule'

@ChildEntity()
class AndRule extends Rule {}

export default AndRule
