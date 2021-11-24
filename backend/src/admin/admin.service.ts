import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User } from '../user/entities/user.entity';
import { DEFAULT_TIMEZONE } from '../utils/DateUtils';
import { Between, Repository } from 'typeorm';
import { FoodEntry } from '../food-entry/entities/food-entry.entity';
import { round } from 'lodash';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(FoodEntry)
    private readonly foodEntryRepository: Repository<FoodEntry>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return `This action returns all report`;
  }

  async getStat() {
    const today = dayjs().tz(DEFAULT_TIMEZONE);

    const lastSevenDayStart = today
      .subtract(7, 'days')
      .startOf('day')
      .toISOString();
    // include today
    const lastSevenDayEnd = today.toISOString();

    const numberOfFoodEntriesLastSevenDay =
      await this.foodEntryRepository.count({
        where: {
          createdAt: Between(lastSevenDayStart, lastSevenDayEnd),
        },
      });
    const numberOfFoodEntriesLastWeek = await this.foodEntryRepository.count({
      where: {
        createdAt: Between(
          // when Sunday is the first day of the week
          today.weekday(-7).startOf('day').toISOString(),
          today.weekday(-1).endOf('day').toISOString(),
        ),
      },
    });

    const numberOfUsers = await this.userRepository.count();
    const { totalCalorieLastSevenDay } = await this.foodEntryRepository
      .createQueryBuilder('foodEntry')
      .select('SUM(foodEntry.calorie)', 'totalCalorieLastSevenDay')
      .andWhere(
        'foodEntry.createdAt >= :start AND foodEntry.createdAt <= :end',
        {
          start: lastSevenDayStart,
          end: lastSevenDayEnd,
        },
      )
      .getRawOne();
    const averageCaloriePerUserLastSevenDay =
      totalCalorieLastSevenDay > 0 && numberOfUsers > 0
        ? round(totalCalorieLastSevenDay / numberOfUsers, 2)
        : 0;

    return {
      numberOfFoodEntriesLastSevenDay,
      numberOfFoodEntriesLastWeek,
      numberOfFoodEntriesToday: await this.foodEntryRepository.count({
        where: {
          createdAt: Between(
            today.startOf('day').toISOString(),
            today.endOf('day').toISOString(),
          ),
        },
      }),
      averageCaloriePerUserLastSevenDay:
        averageCaloriePerUserLastSevenDay >= 0
          ? averageCaloriePerUserLastSevenDay
          : 0,
    };
  }
}
