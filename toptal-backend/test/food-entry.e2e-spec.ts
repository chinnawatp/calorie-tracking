import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AuthService } from '../src/auth/auth.service';
import { FoodEntryService } from '../src/food-entry/food-entry.service';
import { User } from '../src/user/entities/user.entity';
import { createTestingApp } from './e2eUtils';

describe('Food Entry', () => {
  let app: INestApplication;

  let accessToken: string;

  const user = new User();
  user.firstName = 'test';
  user.lastName = 'test';
  user.email = 'test@test.com';
  const USER_PWD = 'test1234';

  const createDTO = {
    menuName: 'Burger',
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

  it(`POST /food-entries`, async () => {
    await request(app.getHttpServer())
      .post('/food-entries')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createDTO)
      .expect(201);
  });

  it(`PUT /food-entries/1`, async () => {
    const foodEntryService = app.get(FoodEntryService);
    const result = await foodEntryService.create(user, createDTO);

    await request(app.getHttpServer())
      .put(`/food-entries/${result.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ ...createDTO, menuName: 'Updated Name' })
      .expect(200);
  });

  it(`DELETE /food-entries/1`, async () => {
    const foodEntryService = app.get(FoodEntryService);
    const result = await foodEntryService.create(user, createDTO);

    await request(app.getHttpServer())
      .delete(`/food-entries/${result.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Dinner' })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
