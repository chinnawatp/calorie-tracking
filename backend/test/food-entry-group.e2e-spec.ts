import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AuthService } from '../src/auth/auth.service';
import { FoodEntryService } from '../src/food-entry/food-entry.service';
import { User } from '../src/user/entities/user.entity';
import { createTestingApp } from './e2eUtils';

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
    app = await createTestingApp();

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
        const items = res.body.items;
        expect(items[0].foodEntries).not.toBeNull();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
