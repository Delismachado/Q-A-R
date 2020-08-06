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
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => Question, { eager: true })
  @JoinColumn({ name: 'question_id' })
  question: Question

  @Column()
  value: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Answer
