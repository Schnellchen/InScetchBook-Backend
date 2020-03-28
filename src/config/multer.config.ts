import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";



export const multerOptions = {
    // Enable file size limits
    limits: {
        files: 1,
        fileSize: 5 * 10 * 10 * 10 * 10 * 10 * 10 * 10, // 50 mb in bytes
    },

fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|bmp)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    }
}