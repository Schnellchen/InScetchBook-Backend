import { Module } from '@nestjs/common';
import { ScetchController } from './scetch.controller';
import { ScetchesService } from './scetch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScetchRepository } from './scetch.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ScetchRepository]) ],
  controllers: [ScetchController],
  providers: [ScetchesService]
})
export class ScetchesModule {}
