// Структура DTO. Это объект передачи данных
import { IsNotEmpty, IsString,} from "class-validator";

export class CreateScetchDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}