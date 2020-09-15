/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import Question from '@modules/Questions/infra/typeorm/entities/Question'

@Entity('questions_sets')
class QuestionsSet {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @OneToMany(type => Question, question => question.questionsSet)
  questions: Question[]
}

export default QuestionsSet
