import { Module } from '@nestjs/common';
import { FoodEntryService } from './food-entry.service';
import { FoodEntryController } from './food-entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntry } from './entities/food-entry.entity';
import { FoodEntryGroup } from '../food-entry-group/entities/food-entry-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntry, FoodEntryGroup])],
  controllers: [FoodEntryController],
  providers: [FoodEntryService],
})
export class FoodEntryModule {}
