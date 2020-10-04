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
import Question from '@modules/Questions/infra/typeorm/entities/Question'

@Entity('rules')
@Tree('nested-set')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  type: string

  @TreeChildren()
  operands: Rule[]

  @TreeParent()
  parent: Rule
}

export default Rule
