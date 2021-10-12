import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateFoodEntryDto } from '../food-entry/dto/create-food-entry.dto';
import { FoodEntry } from '../food-entry/entities/food-entry.entity';
import { FoodEntryService } from '../food-entry/food-entry.service';
import { DEFAULT_PAGINATION } from '../utils/PaginationUtils';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly foodEntryService: FoodEntryService,
  ) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get('/report')
  getStat() {
    return this.adminService.getStat();
  }

  @Get('/food-entries')
  async findAllFoodEntries(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query(
      'limit',
      new DefaultValuePipe(DEFAULT_PAGINATION.LIMIT),
      ParseIntPipe,
    )
    limit = DEFAULT_PAGINATION.LIMIT,
  ): Promise<Pagination<FoodEntry>> {
    limit =
      limit > DEFAULT_PAGINATION.MAX_LIMIT
        ? DEFAULT_PAGINATION.MAX_LIMIT
        : limit;
    return this.foodEntryService.paginate({
      options: {
        page,
        limit,
      },
    });
  }

  @Post('/food-entries')
  createFoodEntry(
    @Request() req,
    @Body() createFoodEntryDto: CreateFoodEntryDto,
  ) {
    return this.foodEntryService.create(req.user, createFoodEntryDto);
  }

  @Put('/food-entries/:id')
  updateFoodEntry(
    @Param('id') id: string,
    @Body() updateFoodEntryDto: CreateFoodEntryDto,
  ) {
    return this.foodEntryService.update(+id, updateFoodEntryDto);
  }

  @Delete('/food-entries/:id')
  removeFoodEntry(@Param('id') id: string) {
    return this.foodEntryService.remove(+id);
  }
}
