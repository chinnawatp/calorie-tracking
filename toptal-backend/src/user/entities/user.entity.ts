import { FoodEntryGroup } from 'src/food-entry-group/entities/food-entry-group.entity';
import { FoodEntry } from 'src/food-entry/entities/food-entry.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => FoodEntry, (entity) => entity.user)
  foodEntires: FoodEntry[];

  @OneToMany(() => FoodEntryGroup, (entity) => entity.user)
  foodEntryGroups: FoodEntryGroup[];

  @Column()
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;
}
