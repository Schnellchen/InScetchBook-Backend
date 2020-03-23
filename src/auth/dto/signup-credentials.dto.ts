import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from "class-validator";

export class SignUpCredentialsDto {
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    login: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z)(?=.*[a-z]).*$/,{ message: 'Пароль слишком прост!'}) 
    password: string;
    
    @IsString()
    @IsNotEmpty()
    @Matches(/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)
    email: string;
}