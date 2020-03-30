import { Controller, Post, Body, ValidationPipe, UsePipes, Query, Get, Param, ParseIntPipe, Delete, UseGuards, UseInterceptors, UploadedFile, Req} from '@nestjs/common';
import { ScetchesService } from './scetch.service'
import { CreateScetchDto } from './dto/create-scetch.dto';
import { Scetch } from './scetch.entity';
import { GetScetchFilterDto } from './dto/get-scetch-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { FileInterceptor, } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';


@Controller('scetches')
export class ScetchController {
    
    constructor(private scetchesService:ScetchesService){}

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('image', multerOptions)) // 'image' должно совпадать с ключом запроса
    createScetch(@Body() createTaskDto: CreateScetchDto, @GetUser() user: User, @UploadedFile() image: Express.Multer.File): Promise<Scetch> {
      return this.scetchesService.createScetch(createTaskDto, user, image);
    }

    @Get("all")
    getAllScetches(@Query(ValidationPipe) filterDto: GetScetchFilterDto): Promise<Scetch[]> {
        return this.scetchesService.getAllScetches(filterDto);
    }


    @Get("/:id") 
    getScetchById(@Param("id", ParseIntPipe) id: number): Promise<Scetch> {
        return this.scetchesService.getScetchById(id);
    }

    @Delete("/:id") 
    @UseGuards(AuthGuard())
    deleteScetch(@Param("id", ParseIntPipe) id: number, @GetUser() user: User,): Promise<void> {
        return this.scetchesService.deleteScetch(id, user);
    }

//Тестовый запрос
/* @Post("upload")
    @UseInterceptors( // Если Multermodule.register("folder") работает неккоректно
    FileInterceptor("image", {
      fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        const body = req.body;
        console.log(file);
        if (file.mimetype.match(/\/(jpg|jpeg|png|bmp)$/) && file !== undefined) {
            // Разрешить хранение файла
            cb(null, true);
        } else {
            // Запретить хранение файла
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    }
    }) )
    uploadedFile(@UploadedFile() image: Express.Multer.File) {
        console.log(image);
} */
        
}
