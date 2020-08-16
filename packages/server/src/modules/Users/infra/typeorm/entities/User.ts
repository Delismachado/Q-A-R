/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import { Exclude } from 'class-transformer'

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  email: string

  @Exclude()
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
