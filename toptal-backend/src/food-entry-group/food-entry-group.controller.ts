import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DEFAULT_PAGINATION } from '../utils/PaginationUtils';
import { FoodEntryGroup } from './entities/food-entry-group.entity';
import { FoodEntryGroupService } from './food-entry-group.service';

@Controller('food-entry-groups')
export class FoodEntryGroupController {
  constructor(private readonly foodEntryGroupService: FoodEntryGroupService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query(
      'limit',
      new DefaultValuePipe(DEFAULT_PAGINATION.LIMIT),
      ParseIntPipe,
    )
    limit = DEFAULT_PAGINATION.LIMIT,
    @Query('startDate') startDate,
    @Query('endDate') endDate,
  ): Promise<Pagination<FoodEntryGroup>> {
    limit =
      limit > DEFAULT_PAGINATION.MAX_LIMIT
        ? DEFAULT_PAGINATION.MAX_LIMIT
        : limit;
    return this.foodEntryGroupService.paginate(req.user, {
      startDate,
      endDate,
      options: {
        page,
        limit,
      },
    });
  }
}
