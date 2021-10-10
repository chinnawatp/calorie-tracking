import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodEntryModule } from './food-entry/food-entry.module';
import { UserModule } from './user/user.module';
import { FoodEntryGroupModule } from './food-entry-group/food-entry-group.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        process.env.NODE_ENV === 'test'
          ? __dirname + '/**/*.entity{.ts,.js}'
          : 'dist/**/*.entity{.ts,.js}',
      ],
      synchronize: false,
      logging: false,
    }),
    FoodEntryModule,
    UserModule,
    FoodEntryGroupModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
