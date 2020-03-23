import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from "class-validator";

export class SignInCredentialsDto {
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    login: string;

    @IsString() 
    password: string;
    
}