import { Controller, Post, Body, ValidationPipe, UsePipes, Query, Get, Param, ParseIntPipe, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ScetchesService } from './scetch.service'
import { CreateScetchDto } from './dto/create-scetch.dto';
import { Scetch } from './scetch.entity';
import { GetScetchFilterDto } from './dto/get-scetch-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';


@Controller('scetches')
export class ScetchController {
    
    constructor(private scetchesService:ScetchesService){}

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('image')) // 'image' должно совпадать с ключом запроса
    createScetch(@Body() createTaskDto: CreateScetchDto, @GetUser() user: User, @UploadedFile() image): Promise<Scetch> {
        return this.scetchesService.createScetch(createTaskDto, user, image);
    }

    @Get()
    getAllScetches(@Query(ValidationPipe) filterDto: GetScetchFilterDto): Promise<Scetch[]> {
        return this.scetchesService.getAllScetches(filterDto);
    }


    @Get("/:id") 
    getScetchById(@Param("id", ParseIntPipe) id: number): Promise<Scetch> {
        return this.scetchesService.getScetchById(id);
    }

    @Delete("/:id") 
    deleteScetch(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
        return this.scetchesService.deleteScetch(id, user);
    }

    @Post("upload")
    @UseInterceptors(FileInterceptor('image'),)
    uploadedFile(@UploadedFile() image) {
        return (image);
}

/* @Post("upload")
    @UseInterceptors( // Если Multermodule.register("folder") работает неккоректно
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'sample', maxCount: 1 },
      ],
      { dest: 'uploads' },
    ),
  )
    uploadedFile(@UploadedFile() image) {
        console.log(image);
} */
        
}
