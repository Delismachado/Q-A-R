/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  role: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User
