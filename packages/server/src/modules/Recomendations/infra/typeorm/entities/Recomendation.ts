import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  TableInheritance
} from 'typeorm'
import Project from '@modules/Projects/infra/typeorm/entities/Project'

@Entity('recomendations')
class Recomendation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  type: string

  @Column()
  projectId: string

  @ManyToOne(() => Project, project => project.recomendations, {
    eager: true,
    onDelete: 'CASCADE'
  })
  project: Project

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Recomendation
