import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { User } from '../src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntry } from '../src/food-entry/entities/food-entry.entity';
import { FoodEntryGroup } from '../src/food-entry-group/entities/food-entry-group.entity';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../src/auth/auth.service';
import { FoodEntryService } from '../src/food-entry/food-entry.service';

describe('Food Entry Group', () => {
  let app: INestApplication;

  let accessToken: string;

  const user = new User();
  user.firstName = 'test';
  user.lastName = 'test';
  user.email = 'test@test.com';
  const USER_PWD = 'test1234';

  const createDTO = {
    menuName: 'Steak',
    price: 1,
    calorie: 2,
    takenAt: new Date().toISOString(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const connection = app.get(Connection);
    await connection.synchronize(true);
    
    user.password = await bcrypt.hash(USER_PWD, 10);
    await connection.getRepository(User).save(user);

    const authService = app.get(AuthService);
    const res = await authService.login({
      email: user.email,
      password: USER_PWD,
    });

    accessToken = res.accessToken;
  });

  it(`GET /food-entry-groups`, async () => {
    const foodEntryService = app.get(FoodEntryService);
    await foodEntryService.create(user, createDTO);

    await request(app.getHttpServer())
      .get('/food-entry-groups')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect((res) => {
        console.log(res.body, 'GET Food Entry Groups response');

        const items = res.body.items;
        expect(items[0].foodEntries).not.toBeNull();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
