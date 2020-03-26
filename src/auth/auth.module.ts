import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),  // Стратегия c использованием токенов для аутентификации
    JwtModule.register({ // Модуль управления токенами 
        // Конфигурация
        secret: "SiteSecret", // Секретный ключ, которым подписывается токен
        signOptions: {
          expiresIn: 3600,  // Срок действия токена
        },
      }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService,
  JwtStrategy,],
  exports: [ // При импорте данного модуля будет импортироваться и эти
    JwtStrategy,
    PassportModule,
  ],
})
export class AuthModule {}
