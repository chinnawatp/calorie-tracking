import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodEntryService } from './food-entry.service';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';
import { UpdateFoodEntryDto } from './dto/update-food-entry.dto';

@Controller('food-entry')
export class FoodEntryController {
  constructor(private readonly foodEntryService: FoodEntryService) {}

  @Post()
  create(@Body() createFoodEntryDto: CreateFoodEntryDto) {
    return this.foodEntryService.create(createFoodEntryDto);
  }

  @Get()
  findAll() {
    return this.foodEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodEntryDto: UpdateFoodEntryDto) {
    return this.foodEntryService.update(+id, updateFoodEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodEntryService.remove(+id);
  }
}
