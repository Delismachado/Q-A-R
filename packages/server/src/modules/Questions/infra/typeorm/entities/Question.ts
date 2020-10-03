/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import Project from '@modules/Projects/infra/typeorm/entities/Project'
import Fact from '@modules/Facts/infra/typeorm/entities/Fact'

export enum QuestionType {
  TRUEORFALSE = 'true or false',
  CHOICES = 'choices',
  MULTIPLE_CHOICES = 'multiple choices',
  NUMERIC_RANGE = 'numeric range',
  TEXT = 'text'
}

@Entity('questions')
class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.TRUEORFALSE
  })
  type: QuestionType

  @Column({ type: 'json', default: {} })
  options: any

  @ManyToOne(() => Project, project => project.questions, {
    eager: true,
    onDelete: 'CASCADE'
  })
  project: Project

  @OneToMany(() => Fact, fact => fact.question, {
    eager: false
  })
  facts: Fact[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Question
