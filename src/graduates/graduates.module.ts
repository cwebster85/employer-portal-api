import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraduatesService } from './graduates.service';
import { GraduatesController } from './graduates.controller';
import { Graduate } from './entities/graduate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Graduate])],
  controllers: [GraduatesController],
  providers: [GraduatesService],
})
export class GraduatesModule {}
