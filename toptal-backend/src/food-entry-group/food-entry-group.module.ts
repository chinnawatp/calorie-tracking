import { Module } from '@nestjs/common';
import { FoodEntryGroupService } from './food-entry-group.service';
import { FoodEntryGroupController } from './food-entry-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntryGroup } from './entities/food-entry-group.entity';

@Module({
  controllers: [FoodEntryGroupController],
  providers: [FoodEntryGroupService],
  imports: [TypeOrmModule.forFeature([FoodEntryGroup])],
})
export class FoodEntryGroupModule {}
