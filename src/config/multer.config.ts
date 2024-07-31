import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
export const multerConfig: MulterOptions = {
    storage: diskStorage({
        destination: join(__dirname, '../uploads/documents'), // Directory where files will be stored
        filename: (req, file, callback) => {
            const fileName = `${extname(file.originalname)}`;
            console.log(fileName,"mtaa l multer");

            callback(null, fileName);
        },
    }),
    fileFilter: (req, file, callback) => {

        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
        if (!allowedTypes.includes(file.mimetype)) {
            return callback(new Error('Invalid file type'), false);
        }
        callback(null, true);
    },
};
