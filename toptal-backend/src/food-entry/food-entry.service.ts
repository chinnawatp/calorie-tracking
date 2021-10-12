import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { User } from '../user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';
import { FoodEntry } from './entities/food-entry.entity';
import { FoodEntryGroup } from '../food-entry-group/entities/food-entry-group.entity';
import { FoodEntryGroupService } from '../food-entry-group/food-entry-group.service';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { DEFAULT_TIMEZONE } from 'src/utils/DateUtils';

@Injectable()
export class FoodEntryService {
  constructor(
    @InjectRepository(FoodEntry)
    private readonly foodEntryRepository: Repository<FoodEntry>,
    @InjectRepository(FoodEntryGroup)
    private readonly foodEntryGroupRepository: Repository<FoodEntryGroup>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly foodEntryGroupService: FoodEntryGroupService,
  ) {}

  async paginate({
    options,
  }: {
    options: IPaginationOptions;
  }): Promise<Pagination<FoodEntry>> {
    const queryBuilder =
      this.foodEntryRepository.createQueryBuilder('foodEntry');
    queryBuilder.leftJoinAndSelect(
      'foodEntry.foodEntryGroup',
      'foodEntryGroup',
    );
    queryBuilder.leftJoinAndSelect('foodEntry.user', 'user');
    queryBuilder.orderBy('foodEntry.id');

    return paginate<FoodEntry>(queryBuilder, options);
  }

  async create(user: User, createFoodEntryDto: CreateFoodEntryDto) {
    const foodEntry = new FoodEntry();
    foodEntry.menuName = createFoodEntryDto.menuName;
    foodEntry.price = createFoodEntryDto.price;
    foodEntry.calorie = createFoodEntryDto.calorie;
    foodEntry.takenAt = new Date(createFoodEntryDto.takenAt);
    foodEntry.user = user;

    let foodEntryGroup = await this.foodEntryGroupRepository.findOne({
      where: {
        takenAt: Between(
          dayjs(foodEntry.takenAt).startOf('day'),
          dayjs(foodEntry.takenAt).endOf('day'),
        ),
      },
    });

    if (!foodEntryGroup) {
      foodEntryGroup = new FoodEntryGroup();
      foodEntryGroup.calorie = 0;
      foodEntryGroup.price = 0;
      foodEntryGroup.takenAt = dayjs(foodEntry.takenAt).toDate();
      foodEntryGroup.user = user;
      await this.foodEntryGroupRepository.save(foodEntryGroup);
    }

    foodEntry.foodEntryGroup = foodEntryGroup;
    const result = await this.foodEntryRepository.save(foodEntry);

    await this.foodEntryGroupService.updatePriceAndCalorie(foodEntryGroup.id);

    return result;
  }

  findAll() {
    return `This action returns all foodEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodEntry`;
  }

  async update(id: number, updateFoodEntryDto: CreateFoodEntryDto) {
    const foodEntry = await this.foodEntryRepository.findOneOrFail(id);

    foodEntry.menuName = updateFoodEntryDto.menuName;
    foodEntry.price = updateFoodEntryDto.price;
    foodEntry.calorie = updateFoodEntryDto.calorie;
    foodEntry.takenAt = new Date(updateFoodEntryDto.takenAt);

    await this.foodEntryRepository.save(foodEntry);

    return foodEntry;
  }

  async remove(id: number) {
    const foodEntry = await this.foodEntryRepository.findOneOrFail(id);

    await this.foodEntryRepository.remove(foodEntry);

    await this.foodEntryGroupService.updatePriceAndCalorie(
      foodEntry.foodEntryGroupId,
    );
  }

  async getCreteOrUpdateWarningMessage(userId: number) {
    const user = await this.userRepository.findOneOrFail(userId);

    const today = dayjs().tz(DEFAULT_TIMEZONE);

    const { totalCalorieToday } = await this.foodEntryRepository
      .createQueryBuilder('foodEntry')
      .select('SUM(foodEntry.calorie)', 'totalCalorieToday')
      .andWhere(
        'foodEntry.createdAt >= :start AND foodEntry.createdAt <= :end',
        {
          start: today.startOf('day').toISOString(),
          end: today.endOf('day').toISOString(),
        },
      )
      .getRawOne();

    console.log({ totalCalorieToday }, 'Total calorie for today');

    if (totalCalorieToday >= user.calorieLimitPerDay) {
      return `You have reached the daily limit of ${user.calorieLimitPerDay} calories`;
    }

    const { totalPriceCurrentMonth } = await this.foodEntryRepository
      .createQueryBuilder('foodEntry')
      .select('SUM(foodEntry.price)', 'totalPriceCurrentMonth')
      .andWhere(
        'foodEntry.createdAt >= :start AND foodEntry.createdAt <= :end',
        {
          start: today.startOf('month').toISOString(),
          end: today.endOf('month').toISOString(),
        },
      )
      .getRawOne();

    console.log(
      { totalPriceCurrentMonth },
      'Total price for current month',
    );

    if (totalPriceCurrentMonth > user.priceLimitPerMonth) {
      return `You have exceeded the monthly limit of $${user.calorieLimitPerDay}`;
    }

    return '';
  }
}
