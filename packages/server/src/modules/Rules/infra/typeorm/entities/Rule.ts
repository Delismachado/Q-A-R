/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent
} from 'typeorm'
import Question from '@modules/Questions/infra/typeorm/entities/Question'

export enum RuleType {
  EXPRESSION = 'expression',
  FACT = 'fact'
}

@Entity('rules')
@Tree('nested-set')
class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Question)
  question: Question

  @Column({ type: 'json', nullable: true })
  exactValue: any

  @Column({
    type: 'enum',
    enum: RuleType,
    default: RuleType.FACT
  })
  type: RuleType

  @Column({ nullable: true })
  operator: string

  @TreeChildren()
  operands: Rule[]

  @TreeParent()
  parent: Rule
}

export default Rule
