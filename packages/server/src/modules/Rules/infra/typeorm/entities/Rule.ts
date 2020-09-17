/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import Question from '@modules/Questions/infra/typeorm/entities/Question'

@Entity('rules')
class Rule {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question

  @Column({ type: 'json' })
  exact_value: any

  @Column()
  ruleType: string

  @Column()
  operator: string

  @ManyToOne(() => Rule, { lazy: true })
  @JoinColumn({ name: 'operand1Id' })
  operand1: Rule | undefined

  @ManyToOne(() => Rule, { lazy: true })
  @JoinColumn({ name: 'operand2Id' })
  operand2: Rule | undefined
}

export default Rule
