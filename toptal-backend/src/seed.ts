import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as getRandomFruitsName from 'random-fruits-name';
import { Connection } from 'typeorm';
import { RoleName } from './auth/role.enum';
import { CreateFoodEntryDto } from './food-entry/dto/create-food-entry.dto';
import { FoodEntryService } from './food-entry/food-entry.service';
import { Role } from './user/entities/role.entity';
import { User } from './user/entities/user.entity';

export async function seed(app: INestApplication) {
  console.log('Start Seeding');

  const connection = app.get(Connection);
  await connection.synchronize(true);

  const user = await createUser(connection);
  const role = await createRole(connection);
  await assignRole(connection, user, role);

  for (let index = 0; index < 100; index++) {
    await createFoodEntry(app, connection, user);
  }

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

async function createFoodEntry(
  app: INestApplication,
  connection: Connection,
  user,
) {
  const foodEntry = new CreateFoodEntryDto();
  foodEntry.menuName = getRandomFruitsName('en');
  foodEntry.price = getRandomInt(1, 1500);
  foodEntry.calorie = getRandomInt(1, 1000);
  foodEntry.takenAt = getRandomDate(
    new Date('2021-10-01'),
    new Date('2021-11-01'),
  ).toISOString();

  const foodEntryService = app.get(FoodEntryService);
  await foodEntryService.create(user, foodEntry);

  return foodEntry;
}

async function createRole(connection: Connection) {
  const role = new Role();
  role.name = RoleName.ADMIN;

  return connection.getRepository(Role).save(role);
}

async function assignRole(connection: Connection, user: User, role: Role) {
  user.roles = [role];
  return connection.getRepository(User).save(user);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
}
