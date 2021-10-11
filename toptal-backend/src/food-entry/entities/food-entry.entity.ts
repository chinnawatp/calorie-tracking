import { FoodEntryGroup } from '../..//food-entry-group/entities/food-entry-group.entity';
import { User } from '../..//user/entities/user.entity';
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
  menuName: string;

  @Column()
  calorie: number;

  @Column({ comment: 'Storing in smallest unit' })
  price: number;

  @Column()
  foodEntryGroupId: number;

  @ManyToOne(
    () => FoodEntryGroup,
    (foodEntryGroup) => foodEntryGroup.foodEntries,
    { nullable: false },
  )
  foodEntryGroup: FoodEntryGroup;

  @ManyToOne(() => FoodEntry, (entity) => entity.user)
  user: User;

  @Column()
  takenAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
