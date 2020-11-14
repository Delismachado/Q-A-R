/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column
} from 'typeorm'
import User from '@modules/Users/infra/typeorm/entities/User'
import Question from '@modules/Questions/infra/typeorm/entities/Question'

@Entity('answers')
class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Question)
  question: Question

  @Column({ type: 'json' })
  values: any

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Answer
