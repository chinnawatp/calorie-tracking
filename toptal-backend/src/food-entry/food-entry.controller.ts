import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { FoodEntryService } from './food-entry.service';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('food-entries')
export class FoodEntryController {
  constructor(private readonly foodEntryService: FoodEntryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createFoodEntryDto: CreateFoodEntryDto) {
    console.log({createFoodEntryDto});
    return this.foodEntryService.create(req.user, createFoodEntryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodEntryService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodEntryDto: CreateFoodEntryDto,
  ) {
    return this.foodEntryService.update(+id, updateFoodEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodEntryService.remove(+id);
  }
}
