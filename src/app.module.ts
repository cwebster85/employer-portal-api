import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraduatesModule } from './graduates/graduates.module';
import { Graduate } from './graduates/entities/graduate.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false, // needed this in order to allow pg connection
      },
      synchronize: true, // keep on to auto-create tables
    }),
    TypeOrmModule.forFeature([Graduate]),
    GraduatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
