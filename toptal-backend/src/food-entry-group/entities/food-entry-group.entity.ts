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

  @Column({ type: 'timestamptz' })
  takenAt: Date;

  @OneToMany(() => FoodEntry, (foodEntry) => foodEntry.foodEntryGroup, {
    eager: true
  })
  foodEntries: FoodEntry[];

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.foodEntryGroups)
  user: User;
}
