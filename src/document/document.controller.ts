import {
    Controller,
    Post,
    Param,
    Res,
    UploadedFile,
    UseInterceptors,
    HttpCode,
    HttpStatus,
    Get,
    Body, Delete
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { DocumentService } from './document.service';
import { multerConfig } from '../config/multer.config';

@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Post('upload/:userId')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async uploadDocument(@Param('userId') userId: number, @UploadedFile() file: Express.Multer.File,@Body() body) {
        return this.documentService.uploadDocument(userId, file,body['filename'],body['description']);
    }
    @Get('user/:userId')
    async getDocumentsByUser(@Param('userId') userId: number) {
        return this.documentService.getDocumentsByUser(userId);
    }

    @Get('download/:id')
    @HttpCode(HttpStatus.OK)
    async downloadDocument(@Param('id') id: number, @Res() res: Response) {
        const document = await this.documentService.downloadDocument(id);
        res.set('Content-Type', 'application/octet-stream'); // Set appropriate MIME type if needed
        res.send(document);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteDocument(@Param('id') id: number): Promise<void> {
        return this.documentService.deleteDocument(id);
    }
}
