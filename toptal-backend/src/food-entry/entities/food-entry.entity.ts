import { FoodEntryGroup } from 'src/food-entry-group/entities/food-entry-group.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FoodEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calorie: number;

  @Column({ comment: 'Storing in smallest unit' })
  price: number;

  @ManyToOne(
    () => FoodEntryGroup,
    (foodEntryGroup) => foodEntryGroup.foodEntires,
  )
  foodEntryGroup: FoodEntryGroup;

  @ManyToOne(() => FoodEntry, (entity) => entity.user)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
