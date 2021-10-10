import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodEntryGroupService } from './food-entry-group.service';
import { CreateFoodEntryGroupDto } from './dto/create-food-entry-group.dto';
import { UpdateFoodEntryGroupDto } from './dto/update-food-entry-group.dto';

@Controller('food-entry-group')
export class FoodEntryGroupController {
  constructor(private readonly foodEntryGroupService: FoodEntryGroupService) {}

  @Post()
  create(@Body() createFoodEntryGroupDto: CreateFoodEntryGroupDto) {
    return this.foodEntryGroupService.create(createFoodEntryGroupDto);
  }

  @Get()
  findAll() {
    return this.foodEntryGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodEntryGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodEntryGroupDto: UpdateFoodEntryGroupDto) {
    return this.foodEntryGroupService.update(+id, updateFoodEntryGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodEntryGroupService.remove(+id);
  }
}
