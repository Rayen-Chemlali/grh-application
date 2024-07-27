import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entity/document.entity';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class DocumentService {
    private readonly documentsPath = './uploads/documents';
    static counter=0;
    constructor(
        @InjectRepository(DocumentEntity)
        private documentRepository: Repository<DocumentEntity>,
    ) {
        if (!fs.existsSync(this.documentsPath)) {
            fs.mkdirSync(this.documentsPath, { recursive: true });
        }
    }

    async uploadDocument(userId: number, file: Express.Multer.File,name:string,description:string): Promise<DocumentEntity> {
        const { filename, path } = file;
        const filePath = join(this.documentsPath,name+Math.random()+filename);
        if (path !== filePath) {
            fs.renameSync(path, filePath);
        }
        const document = this.documentRepository.create({
            filename: name,
            description: description,
            path: filePath,
            user: { id: userId } as any,
        });


        return this.documentRepository.save(document);
    }

    async getDocumentsByUser(userId: number): Promise<DocumentEntity[]> {
        return this.documentRepository.find({
            where: { user: { id: userId } as any },
            relations: ['user'],
        });
    }

    async downloadDocument(id: number): Promise<any> {
        const document = await this.documentRepository.findOneBy({ id });
        if (!document) {
            throw new Error('Document not found');
        }
        try {
            console.log('Document Path:', document.path);
            const fileContent = await fs.promises.readFile(document.path);
            console.log(fileContent)
            return fileContent;
        } catch (error) {
            console.error('Error reading file:', error);
            throw new Error('Failed to read file');
        }
    }
    async deleteDocument(id: number): Promise<void> {
        const document = await this.documentRepository.findOneBy({ id });
        if (!document) {
            throw new Error('Document not found');
        }

        try {
            await fs.promises.unlink(document.path);
        } catch (error) {
            console.error('Error deleting file:', error);
            throw new Error('Failed to delete file');
        }

        await this.documentRepository.delete(id);
    }

}
