import { IsOptional, IsNotEmpty } from "class-validator";

export class GetScetchFilterDto {
    
    @IsOptional()
    @IsNotEmpty()
    search: string;
}