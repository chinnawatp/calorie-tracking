import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FoodEntryGroup } from './entities/food-entry-group.entity';

@Injectable()
export class FoodEntryGroupService {
  constructor(
    @InjectRepository(FoodEntryGroup)
    private readonly repository: Repository<FoodEntryGroup>,
  ) {}

  async paginate(
    user: User,
    {
      startDate,
      endDate,
      options,
    }: {
      startDate?: string;
      endDate?: string;
      options: IPaginationOptions;
    },
  ): Promise<Pagination<FoodEntryGroup>> {
    const queryBuilder = this.repository.createQueryBuilder('foodEntryGroup');
    queryBuilder.andWhere('foodEntryGroup.userId = :userId', {
      userId: user.id,
    });

    if (startDate && endDate) {
      queryBuilder.andWhere(
        'foodEntryGroup.date >= :startDate AND foodEntryGroup.date <= :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    queryBuilder.innerJoinAndSelect(
      'foodEntryGroup.foodEntries',
      'foodEntries',
    );

    return paginate<FoodEntryGroup>(queryBuilder, options);
  }
}
