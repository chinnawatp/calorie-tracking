import { INestApplication } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { AuthService } from '../src/auth/auth.service';
import { Role } from '../src/user/entities/role.entity';
import { User } from '../src/user/entities/user.entity';
import { createTestingModule } from './e2eUtils';

describe('Admin', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await createTestingModule();

    app = moduleRef.createNestApplication();
    await app.init();

    const connection = app.get(Connection);
    await connection.synchronize(true);

    const adminUser = new User();
    adminUser.firstName = 'test';
    adminUser.lastName = 'test';
    adminUser.email = 'admin@test.com';
    adminUser.password = await bcrypt.hash('test1234', 10);

    const normalUser = new User();
    normalUser.firstName = 'test';
    normalUser.lastName = 'test';
    normalUser.email = 'test@test.com';
    normalUser.password = await bcrypt.hash('test1234', 10);

    const role = new Role();
    role.name = 'ADMIN';
    await connection.getRepository(Role).save(role);

    adminUser.roles = [role];

    await connection.getRepository(User).save(adminUser);
    await connection.getRepository(User).save(normalUser);
  });

  it(`/admin/report`, async () => {
    const authService = app.get(AuthService);
    const res = await authService.login({
      email: 'admin@test.com',
      password: 'test1234',
    });

    await request(app.getHttpServer())
      .get('/admin/report')
      .set('Authorization', `Bearer ${res.accessToken}`)
      .expect(200);
  });

  it(`GET /admin/report should return 403 for normal user`, async () => {
    const authService = app.get(AuthService);
    const res = await authService.login({
      email: 'test@test.com',
      password: 'test1234',
    });

    await request(app.getHttpServer())
      .get('/admin/report')
      .set('Authorization', `Bearer ${res.accessToken}`)
      .expect(403);
  });

  afterAll(async () => {
    await app.close();
  });
});
