import { Injectable } from '@nestjs/common';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';
import { UpdateFoodEntryDto } from './dto/update-food-entry.dto';

@Injectable()
export class FoodEntryService {
  create(createFoodEntryDto: CreateFoodEntryDto) {
    return 'This action adds a new foodEntry';
  }

  findAll() {
    return `This action returns all foodEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodEntry`;
  }

  update(id: number, updateFoodEntryDto: UpdateFoodEntryDto) {
    return `This action updates a #${id} foodEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodEntry`;
  }
}
