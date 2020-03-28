import { Module } from '@nestjs/common';
import { ScetchController } from './scetch.controller';
import { ScetchesService } from './scetch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScetchRepository } from './scetch.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([ScetchRepository]), AuthModule, MulterModule.register() ],
  controllers: [ScetchController],
  providers: [ScetchesService]
})
export class ScetchesModule {}
