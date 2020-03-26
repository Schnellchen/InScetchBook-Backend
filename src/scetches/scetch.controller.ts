import { Controller, Post, Body, ValidationPipe, UsePipes, Query, Get } from '@nestjs/common';
import { ScetchesService } from './scetch.service'
import { CreateScetchDto } from './dto/create-scetch.dto';
import { Scetch } from './scetch.entity';
import { GetScetchFilterDto } from './dto/get-scetch-filter.dto';


@Controller('scetches')
export class ScetchController {
    
    constructor(private scetchesService:ScetchesService){}

    @Post()
    @UsePipes(ValidationPipe)
    createScetch(@Body() createTaskDto: CreateScetchDto): Promise<Scetch> {
        return this.scetchesService.createScetch(createTaskDto);
    }

    @Get() // Возвращение задач клиенту по запросу(т.к это контроллер)
    getScetches(@Query(ValidationPipe) filterDto: GetScetchFilterDto): Promise<Scetch[]> {
        return this.scetchesService.getScetches(filterDto);
    }
        
}
