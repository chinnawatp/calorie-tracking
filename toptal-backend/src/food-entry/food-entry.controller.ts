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
import { CreateFoodEntryResponse } from './dto/create-food-entry.response';

@Controller('food-entries')
export class FoodEntryController {
  constructor(private readonly foodEntryService: FoodEntryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createFoodEntryDto: CreateFoodEntryDto) {
    const foodEntry = await this.foodEntryService.create(
      req.user,
      createFoodEntryDto,
    );

    const response = new CreateFoodEntryResponse();
    Object.assign(response, foodEntry);
    response.warningMessage =
      await this.foodEntryService.getCreteOrUpdateWarningMessage(
        foodEntry.userId,
      );
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Request() request,
    @Body() updateFoodEntryDto: CreateFoodEntryDto,
  ) {
    await this.foodEntryService.validateOwner(request.user.id, id);

    const foodEntry = await this.foodEntryService.update(
      +id,
      updateFoodEntryDto,
    );

    const response = new CreateFoodEntryResponse();
    Object.assign(response, foodEntry);
    response.warningMessage =
      await this.foodEntryService.getCreteOrUpdateWarningMessage(
        foodEntry.userId,
      );
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() request, @Param('id') id: string) {
    await this.foodEntryService.validateOwner(request.user.id, id);

    return this.foodEntryService.remove(+id);
  }
}
