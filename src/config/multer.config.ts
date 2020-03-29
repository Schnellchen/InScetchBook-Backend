import { HttpException, HttpStatus, } from "@nestjs/common";
import { extname } from "path";
import { diskStorage } from "multer";


// Файл конфигурации для multer
export const multerOptions = {

    // Хранение файлов
    storage: diskStorage({
    destination: './uploads'}),

    // Параметры файлов
    limits: {
        files: 1,
        fileSize: 5 * 10 * 10 * 10 * 10 * 10 * 10, // 5 mb в байтах
    },

    // Проверка на расширение файла и на случай, если отправляется пустой запрос с одним файлом
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        const body = req.body;
        console.log(file);
        if (file.mimetype.match(/\/(jpg|jpeg|png|bmp)$/) && 
        ((body.title !== "") && (body.title !== undefined) && 
        (body.description !== "") && (body.description !== undefined))) {
            // Разрешить хранение файла
            cb(null, true);
        } else {
            // Запретить хранение файла
            cb(new HttpException(`Unsupported file type or data value`, HttpStatus.BAD_REQUEST), false);
        }
    },

}