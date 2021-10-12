import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../src/admin/admin.module';
import { AuthModule } from '../src/auth/auth.module';
import { FoodEntryGroupModule } from '../src/food-entry-group/food-entry-group.module';
import { FoodEntryModule } from '../src/food-entry/food-entry.module';
import { UserModule } from '../src/user/user.module';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as DayJSUtc from 'dayjs/plugin/utc';
import * as weekday from 'dayjs/plugin/weekday';

export async function createTestingModule() {
  dayjs.extend(DayJSUtc);
  dayjs.extend(timezone);
  dayjs.extend(weekday);

  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: 'toptal_e2e',
        entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: false,
      }),
      FoodEntryModule,
      UserModule,
      FoodEntryGroupModule,
      AuthModule,
      AdminModule,
    ],
  }).compile();

  return moduleRef;
}
