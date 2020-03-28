import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";
import { diskStorage } from "multer";


// Опции для настройки multer
export const multerOptions = {
    // Хранение файлов
    storage: diskStorage({
    destination: './uploads'}),

    // Параметры файлов
    limits: {
        files: 1,
        fileSize: 1 * 10 * 10 * 10 * 10 * 10 * 10 * 10, // 10 mb in bytes
    },

    // Расширения файлов
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        /* console.log(JSON.parse(req.body)); */
        if (file.mimetype.match(/\/(jpg|jpeg|png|bmp)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },

}