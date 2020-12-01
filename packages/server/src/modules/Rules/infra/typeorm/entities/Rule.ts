import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
  TableInheritance,
  OneToOne,
  JoinColumn
} from 'typeorm'
import Project from '@modules/Projects/infra/typeorm/entities/Project'
import Recommendation from '@modules/Recommendations/infra/typeorm/entities/Recommendation'
import Answer from '@modules/Answers/infra/typeorm/entities/Answer'

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

  @TreeChildren({
    cascade: true
  })
  operands: Rule[]

  @TreeParent()
  parent: Rule

  label: string

  @Column({
    nullable: true
  })
  recommendationId?: string

  @OneToOne(() => Recommendation, {
    nullable: true
  })
  @JoinColumn()
  recommendation?: Recommendation

  abstract async stringExpression(): Promise<string>
  abstract async compute(answers: Answer[]): Promise<boolean>
}

export default Rule
