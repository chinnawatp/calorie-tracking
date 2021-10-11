import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FoodEntry } from 'src/food-entry/entities/food-entry.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { FoodEntryGroup } from './entities/food-entry-group.entity';
import { sumBy } from 'lodash';

@Injectable()
export class FoodEntryGroupService {
  constructor(
    @InjectRepository(FoodEntryGroup)
    private readonly repository: Repository<FoodEntryGroup>,
    @InjectRepository(FoodEntry)
    private readonly repositoryFoodEntry: Repository<FoodEntry>,
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

  async updatePriceAndCalorie(id: number) {
    const foodEntryGroup = await this.repository.findOneOrFail(id);

    const foodEntries = await this.repositoryFoodEntry.find({
      where: {
        foodEntryGroup: {
          id: foodEntryGroup.id,
        },
      },
    });

    const price = sumBy(foodEntries, (foodEntry) => foodEntry.price);
    foodEntryGroup.price = price;

    const calorie = sumBy(foodEntries, (foodEntry) => foodEntry.calorie);
    foodEntryGroup.calorie = calorie;

    await this.repository.save(foodEntryGroup);
  }
}
