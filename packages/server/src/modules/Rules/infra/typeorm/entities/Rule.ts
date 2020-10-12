import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
  TableInheritance
} from 'typeorm'
import Project from '@modules/Projects/infra/typeorm/entities/Project'
import { Expose } from 'class-transformer'

@Entity('rules')
@Tree('nested-set')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
abstract class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  type: string

  @Column()
  projectId: string

  @ManyToOne(() => Project, {
    eager: false,
    onDelete: 'CASCADE'
  })
  project: Project

  @TreeChildren()
  operands: Rule[]

  @TreeParent()
  parent: Rule

  label: string

  abstract async stringExpression(): Promise<string>
}

export default Rule
