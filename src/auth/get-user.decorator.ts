import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

// Создание своего декоратора. Он имеет два параметра
export const GetUser = createParamDecorator((data, req): User => {
    return req.user; // Получение пользователя из запроса
});

// @GetUSER() user: User эквивалентно user = GetUser т.е. в переменную, украшенную декоратором, записывается результат его вызова