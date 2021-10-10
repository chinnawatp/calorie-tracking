import { FoodEntry } from '../../food-entry/entities/food-entry.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FoodEntryGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calorie: number;

  @Column({ comment: 'Storing in smallest unit' })
  price: number;

  @Column({ type: 'date' })
  date: string;

  @OneToMany(() => FoodEntry, (foodEntry) => foodEntry.foodEntryGroup)
  foodEntries: FoodEntry[];

  @ManyToOne(() => User, (user) => user.foodEntryGroups)
  user: User;
}
