/* eslint-disable camelcase */
import { ChildEntity } from 'typeorm'
import Rule from './Rule'

@ChildEntity()
class OrRule extends Rule {}

export default OrRule
