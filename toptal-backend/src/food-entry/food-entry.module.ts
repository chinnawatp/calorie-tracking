import { Module } from '@nestjs/common';
import { FoodEntryService } from './food-entry.service';
import { FoodEntryController } from './food-entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntry } from './entities/food-entry.entity';
import { FoodEntryGroup } from '../food-entry-group/entities/food-entry-group.entity';
import { FoodEntryGroupModule } from 'src/food-entry-group/food-entry-group.module';

@Module({
  controllers: [FoodEntryController],
  providers: [FoodEntryService],
  imports: [
    FoodEntryGroupModule,
    TypeOrmModule.forFeature([FoodEntry, FoodEntryGroup]),
  ],
  exports: [FoodEntryService],
})
export class FoodEntryModule {}
