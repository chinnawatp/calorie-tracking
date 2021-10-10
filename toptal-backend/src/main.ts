import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seed } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log({ ACTION: process.env.ACTION });
  if (process.env.ACTION === 'SEED') {
    await seed(app);
  }

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
