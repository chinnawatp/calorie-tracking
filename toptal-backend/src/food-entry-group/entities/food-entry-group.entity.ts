import { FoodEntry } from 'src/food-entry/entities/food-entry.entity';
import { User } from 'src/user/entities/user.entity';
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

  @OneToMany(() => FoodEntry, (foodEntry) => foodEntry.foodEntryGroup)
  foodEntires: FoodEntry[];

  @ManyToOne(() => User, (user) => user.foodEntryGroups)
  user: User;
}
