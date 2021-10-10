import { FoodEntryGroup } from '../..//food-entry-group/entities/food-entry-group.entity';
import { FoodEntry } from '../..//food-entry/entities/food-entry.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: 0 })
  calorieLimitPerDay: number;

  @Column({ default: 0 })
  priceLimitPerDay: number;

  @OneToMany(() => FoodEntry, (entity) => entity.user)
  foodEntries: FoodEntry[];

  @OneToMany(() => FoodEntryGroup, (entity) => entity.user)
  foodEntryGroups: FoodEntryGroup[];

  @ManyToMany(() => Role, (entity) => entity.users)
  @JoinTable()
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;
}
