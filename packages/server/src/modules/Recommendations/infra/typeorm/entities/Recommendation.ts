import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne
} from 'typeorm'
import Project from '@modules/Projects/infra/typeorm/entities/Project'

@Entity('recommendations')
class Recommendation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  projectId: string

  @ManyToOne(() => Project, project => project.recommendations, {
    eager: true,
    onDelete: 'CASCADE'
  })
  project: Project

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Recommendation
