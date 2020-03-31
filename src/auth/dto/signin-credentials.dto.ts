import { IsString, MinLength, MaxLength,} from "class-validator";

export class SignInCredentialsDto {
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    login: string;

    @IsString() 
    password: string;
    
}