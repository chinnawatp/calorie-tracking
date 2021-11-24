import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AuthService } from '../src/auth/auth.service';
import { User } from '../src/user/entities/user.entity';
import { createTestingApp } from './e2eUtils';

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestingApp();

    const connection = app.get(Connection);
    await connection.synchronize(true);

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
    const authService = app.get(AuthService);
    const res = await authService.login({
      email: 'test@test.com',
      password: 'test1234',
    });

    await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${res.accessToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
