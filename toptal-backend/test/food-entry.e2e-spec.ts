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

describe('Auth', () => {
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
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, FoodEntry, FoodEntryGroup],
          logging: false,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const connection = app.get(Connection);
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
      .send({ menuName: 'Updated Name' })
      .expect(200)
      .expect((res) => {
        expect(res.body.menuName).toBe('Updated Name');
      });
  });

  it(`DELETE /food-entries/1`, async () => {
    const foodEntryService = app.get(FoodEntryService);
    const result = await foodEntryService.create(user, createDTO);

    await request(app.getHttpServer())
      .delete(`/food-entries/${result.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Dinner' })
      .expect(200)
      .expect(async () => {
        const connection = app.get(Connection);
        const count = await connection.getRepository(FoodEntry).count();

        expect(count).toBe(0);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
