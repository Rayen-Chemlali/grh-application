import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DocumentEntity } from './entity/document.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';


jest.mock('fs');

describe('DocumentService', () => {
  let service: DocumentService;
  let repository: Repository<DocumentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: getRepositoryToken(DocumentEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    repository = module.get<Repository<DocumentEntity>>(getRepositoryToken(DocumentEntity));
  });

  describe('uploadDocument', () => {
    it('should upload a document', async () => {
      const mockDocument = { id: 1, filename: 'test.pdf', description: 'test', path: '/uploads/documents/test12345.pdf', user: { id: 1 } };
      const mockFile = { filename: 'test.pdf', path: '/temp/test.pdf' } as any;

      jest.spyOn(fs, 'renameSync').mockImplementation(() => {});
      jest.spyOn(repository, 'create').mockReturnValue(mockDocument as any);
      jest.spyOn(repository, 'save').mockResolvedValue(mockDocument as any);

      const result = await service.uploadDocument(1, mockFile, 'test', 'test');
      expect(result).toEqual(mockDocument);

      expect(repository.save).toHaveBeenCalledWith(mockDocument);
    });
  });

  describe('getDocumentsByUser', () => {
    it('should return documents for a user', async () => {
      const mockDocuments = [{ id: 1, filename: 'test.pdf', description: 'test', path: '/uploads/documents/test12345.pdf', user: { id: 1 } }];
      jest.spyOn(repository, 'find').mockResolvedValue(mockDocuments as any);

      const result = await service.getDocumentsByUser(1);
      expect(result).toEqual(mockDocuments);
      expect(repository.find).toHaveBeenCalledWith({ where: { user: { id: 1 } as any }, relations: ['user'] });
    });
  });
});
