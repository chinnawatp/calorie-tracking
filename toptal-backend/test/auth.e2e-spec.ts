import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';
import { User } from '../src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntry } from '../src/food-entry/entities/food-entry.entity';
import { FoodEntryGroup } from '../src/food-entry-group/entities/food-entry-group.entity';

describe('Auth', () => {
  let app: INestApplication;

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

    const user = new User();
    user.firstName = 'test';
    user.lastName = 'test';
    user.email = 'test@test.com';
    user.password = await bcrypt.hash('test1234', 10);

    await connection.getRepository(User).save(user);
  });

  it(`/auth/login`, async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'test1234' })
      .expect(200);
  });

  it(`/auth/profile`, async () => {
    await request(app.getHttpServer()).get('/auth/profile').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
