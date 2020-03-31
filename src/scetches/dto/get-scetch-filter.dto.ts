import { IsOptional, IsNotEmpty, IsString, IsNumberString } from "class-validator";


export class GetScetchFilterDto {
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    range: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    offset: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumberString()
    userId: number;

}