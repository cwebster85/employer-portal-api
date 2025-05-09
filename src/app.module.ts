import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraduatesModule } from './graduates/graduates.module';
import { Graduate } from './graduates/entities/graduate.entity'; // or wherever it's defined

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5433', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // use only in development
    }),
    TypeOrmModule.forFeature([Graduate]),
    GraduatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
