import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntryGroupModule } from 'src/food-entry-group/food-entry-group.module';
import { FoodEntryModule } from 'src/food-entry/food-entry.module';
import { User } from 'src/user/entities/user.entity';
import { FoodEntryGroup } from '../food-entry-group/entities/food-entry-group.entity';
import { FoodEntry } from '../food-entry/entities/food-entry.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    TypeOrmModule.forFeature([FoodEntry, FoodEntryGroup, User]),
    FoodEntryModule,
    FoodEntryGroupModule,
  ],
})
export class AdminModule {}
