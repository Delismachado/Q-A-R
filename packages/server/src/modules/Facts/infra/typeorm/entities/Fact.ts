import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  TableInheritance
} from 'typeorm'
import Question from '@modules/Questions/infra/typeorm/entities/Question'
import Answer from '@modules/Answers/infra/typeorm/entities/Answer'

@Entity('facts')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
abstract class Fact {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  questionId: string

  @ManyToOne(() => Question, {
    eager: true,
    onDelete: 'CASCADE'
  })
  question: Question

  @Column()
  type: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  abstract verify(answer: Answer): boolean
}

export default Fact
