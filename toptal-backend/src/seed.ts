import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from './user/entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function seed(app: INestApplication) {
  console.log('Start Seeding');

  const connection = app.get(Connection);
  await connection.synchronize(true);

  await createUser(connection);

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
