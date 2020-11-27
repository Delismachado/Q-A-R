import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn
} from 'typeorm'
import Project from '@modules/Projects/infra/typeorm/entities/Project'
import Rule from '@modules/Rules/infra/typeorm/entities/Rule'

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

  @Column()
  ruleId: string

  @OneToOne(() => Rule, rule => rule.recommendation, {
    eager: true
  })
  @JoinColumn()
  rule: Rule

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Recommendation
