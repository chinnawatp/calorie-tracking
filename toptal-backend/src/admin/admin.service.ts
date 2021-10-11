import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User } from 'src/user/entities/user.entity';
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

    const numberOfFoodEntriesLastSevenDay =
      await this.foodEntryRepository.count({
        where: {
          createdAt: Between(
            today.subtract(7, 'days').startOf('day').toISOString(),
            today.toISOString(),
          ),
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
    const averageCaloriePerUserLastSevenDay = round(
      numberOfFoodEntriesLastSevenDay / numberOfUsers,
      2,
    );

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
