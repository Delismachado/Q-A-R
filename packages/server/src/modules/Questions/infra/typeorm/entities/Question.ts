/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { type } from 'os'
import QuestionsSet from '@modules/QuestionsSets/infra/typeorm/entities/QuestionsSet'

@Entity('questions')
class Question {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  type: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Column({ type: 'json' })
  options: any

  @Column()
  questionsSetId: string

  @ManyToOne(type => QuestionsSet, questionSet => questionSet.questions, {
    eager: true
  })
  questionsSet: QuestionsSet
}

export default Question
