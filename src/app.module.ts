import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScetchesModule } from './scetches/scetch.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, ScetchesModule],
  
})
export class AppModule {}
