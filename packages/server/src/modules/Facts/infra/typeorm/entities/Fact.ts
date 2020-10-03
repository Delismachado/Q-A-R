/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column
} from 'typeorm'
import Question from '@modules/Questions/infra/typeorm/entities/Question'

@Entity('facts')
class Fact {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToOne(() => Question, {
    eager: true,
    onDelete: 'CASCADE'
  })
  question: Question

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Fact
