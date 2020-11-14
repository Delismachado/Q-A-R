/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  TableInheritance
} from 'typeorm'
import Project from '@modules/Projects/infra/typeorm/entities/Project'
import Fact from '@modules/Facts/infra/typeorm/entities/Fact'

@Entity('questions')
@TableInheritance({
  column: { type: 'varchar', name: 'type' }
})
class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  type: string

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

  readonly factTypes: string[]

  constructor(factTypes: string[]) {
    this.factTypes = factTypes
  }
}

export default Question
