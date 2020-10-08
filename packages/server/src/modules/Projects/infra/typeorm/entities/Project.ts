/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import Question from '@modules/Questions/infra/typeorm/entities/Question'
import Fact from '@modules/Facts/infra/typeorm/entities/Fact'
import Recomendation from '@modules/Recomendations/infra/typeorm/entities/Recomendation'

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @OneToMany(() => Question, question => question.project)
  questions: Question[]

  @OneToMany(() => Fact, fact => fact.question.project)
  facts: Fact[]

  @OneToMany(() => Recomendation, recomendation => recomendation.project)
  recomendations: Recomendation[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Project
