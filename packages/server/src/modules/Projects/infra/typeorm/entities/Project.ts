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
import Recommendation from '@modules/Recommendations/infra/typeorm/entities/Recommendation'
import Rule from '@modules/Rules/infra/typeorm/entities/Rule'

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

  @OneToMany(() => Rule, rule => rule.project)
  rules: Rule[]

  @OneToMany(() => Recommendation, recommendation => recommendation.project)
  recommendations: Recommendation[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Project
