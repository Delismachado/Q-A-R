/* eslint-disable camelcase */
import { ChildEntity } from 'typeorm'
import Rule from './Rule'

@ChildEntity()
class NotRule extends Rule {}

export default NotRule
