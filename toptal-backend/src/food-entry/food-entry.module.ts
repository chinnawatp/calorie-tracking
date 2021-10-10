import { Module } from '@nestjs/common';
import { FoodEntryService } from './food-entry.service';
import { FoodEntryController } from './food-entry.controller';

@Module({
  controllers: [FoodEntryController],
  providers: [FoodEntryService]
})
export class FoodEntryModule {}
