/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import User from '@modules/Users/infra/typeorm/entities/User'
import Project from '@modules/Projects/infra/typeorm/entities/Project'

@Entity('participations')
class Participation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  projectId: string

  @ManyToOne(() => Project, project => project.participation, {
    eager: true,
    onDelete: 'CASCADE'
  })
  project: Project

  @Column()
  userId: string

  @ManyToOne(() => User, user => user.participation, {
    eager: true,
    onDelete: 'CASCADE'
  })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Participation
