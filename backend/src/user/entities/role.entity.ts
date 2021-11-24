import {
  Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (entity) => entity.roles)
  users: User[];
}
