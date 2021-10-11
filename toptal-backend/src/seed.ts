import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from './user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FoodEntry } from './food-entry/entities/food-entry.entity';
import { FoodEntryGroup } from './food-entry-group/entities/food-entry-group.entity';
import * as dayjs from 'dayjs';
import { DATE_FORMAT } from './utils/DateUtils';

export async function seed(app: INestApplication) {
  console.log('Start Seeding');

  const connection = app.get(Connection);
  await connection.synchronize(true);

  const user = await createUser(connection);
  await createFoodEntry(connection, user);

  console.log('Seeding complete!');
}

async function createUser(connection: Connection) {
  const user = new User();
  user.firstName = 'test';
  user.lastName = 'test';
  user.email = 'test@test.com';
  user.password = await bcrypt.hash('test1234', 10);

  await connection.getRepository(User).save(user);
  return user;
}

async function createFoodEntry(connection: Connection, user) {
  const foodEntry = new FoodEntry();
  foodEntry.menuName = 'Burger';
  foodEntry.price = 20;
  foodEntry.calorie = 20;
  foodEntry.takenAt = new Date();

  const foodEntryGroup = new FoodEntryGroup();
  foodEntryGroup.calorie = 0;
  foodEntryGroup.price = 0;
  foodEntryGroup.date = dayjs(foodEntry.takenAt).format(DATE_FORMAT);
  foodEntryGroup.user = user;
  await connection.getRepository(FoodEntryGroup).save(foodEntryGroup);

  foodEntry.foodEntryGroup = foodEntryGroup;
  await connection.getRepository(FoodEntry).save(foodEntry);
  return foodEntry;
}
