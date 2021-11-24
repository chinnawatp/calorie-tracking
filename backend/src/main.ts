import { NestFactory } from '@nestjs/core';
import * as dayjs from 'dayjs';
import { AppModule } from './app.module';
import { seed } from './seed';
import * as timezone from 'dayjs/plugin/timezone';
import * as DayJSUtc from 'dayjs/plugin/utc';
import * as weekday from 'dayjs/plugin/weekday';
import { ValidationPipe } from '@nestjs/common';

dayjs.extend(DayJSUtc);
dayjs.extend(timezone);
dayjs.extend(weekday);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  console.log({ ACTION: process.env.ACTION });
  if (process.env.ACTION === 'SEED') {
    await seed(app);
    return app.close();
  }

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
