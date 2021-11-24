import { Module } from '@nestjs/common';
import { FoodEntryGroupService } from './food-entry-group.service';
import { FoodEntryGroupController } from './food-entry-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntryGroup } from './entities/food-entry-group.entity';
import { FoodEntry } from '../food-entry/entities/food-entry.entity';

@Module({
  controllers: [FoodEntryGroupController],
  providers: [FoodEntryGroupService],
  imports: [TypeOrmModule.forFeature([FoodEntryGroup, FoodEntry])],
  exports: [FoodEntryGroupService],
})
export class FoodEntryGroupModule {}
