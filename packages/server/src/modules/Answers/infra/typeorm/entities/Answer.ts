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
import Participation from '@modules/Participations/infra/typeorm/entities/Participation'

@Entity('answers')
class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  participationId: string

  @ManyToOne(() => Participation)
  participation: Participation

  @Column()
  questionId: string

  @ManyToOne(() => Question)
  question: Question

  @Column({ type: 'json' })
  values: any

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Answer
