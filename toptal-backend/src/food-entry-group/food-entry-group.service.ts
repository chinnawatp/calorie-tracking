import { Injectable } from '@nestjs/common';
import { CreateFoodEntryGroupDto } from './dto/create-food-entry-group.dto';
import { UpdateFoodEntryGroupDto } from './dto/update-food-entry-group.dto';

@Injectable()
export class FoodEntryGroupService {
  create(createFoodEntryGroupDto: CreateFoodEntryGroupDto) {
    return 'This action adds a new foodEntryGroup';
  }

  findAll() {
    return `This action returns all foodEntryGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodEntryGroup`;
  }

  update(id: number, updateFoodEntryGroupDto: UpdateFoodEntryGroupDto) {
    return `This action updates a #${id} foodEntryGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodEntryGroup`;
  }
}
