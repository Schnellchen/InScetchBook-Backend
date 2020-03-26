import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

// Создаем стратегию, которая будет использоваться паспортом для аутентификации

@Injectable() // Декоратор, помечающий класс как provider (сервис?)
export class JwtStrategy extends PassportStrategy(Strategy) { // Наследуется базовый класс стратегии
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository, // Иньектируем репозиторий
    ) {
        super({ // Вызов конструктора базового класса (который мы наследуем). В его параметрах указываем конфигурацию того, как работать с паспортом
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Получение токена из заголовка запроса. Bearer - любая сторона может делать с ним что хочет
            secretOrKey: "SiteSecret", // Тот же секрет, что и в модуле. Пасспорт использует его для проверки подписи токена
        });
    }

    //NestJs проверяет валидность подписи с помощью секрета выше, если подпись не валидна, то будет ошибка, иначе - вызывается метод validate

    async validate(payload: JwtPayload): Promise<User> { // Метод, который должен существовать у всех стратегий
        const { login } = payload;
        const user = await this.userRepository.findOne({ login });

        if (!user) {
        throw new UnauthorizedException();
    }

    return user;

    }

}