// Структура DTO. Это объект передачи данных
import { IsNotEmpty, IsString, IsObject } from "class-validator";

export class CreateScetchDto {
    @IsNotEmpty() // Декоратор пакета class-validator. Проверка на пустоту
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}