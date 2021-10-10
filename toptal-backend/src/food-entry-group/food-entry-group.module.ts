import { Module } from '@nestjs/common';
import { FoodEntryGroupService } from './food-entry-group.service';
import { FoodEntryGroupController } from './food-entry-group.controller';

@Module({
  controllers: [FoodEntryGroupController],
  providers: [FoodEntryGroupService]
})
export class FoodEntryGroupModule {}
