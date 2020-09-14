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
  question_id: string

  @Column({ type: 'json' })
  exact_value: any
}

export default Rule
