import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { createMock } from '@golevelup/nestjs-testing';
import { Response } from 'express';

describe('DocumentController', () => {
  let controller: DocumentController;
  let service: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        {
          provide: DocumentService,
          useValue: createMock<DocumentService>(),
        },
      ],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    service = module.get<DocumentService>(DocumentService);
  });

  describe('uploadDocument', () => {
    it('should upload a document', async () => {
      const mockDocument = { id: 1, filename: 'test.pdf', description: 'test', path: '/uploads/test.pdf', user: { id: 1 } };
      const mockFile = { filename: 'test.pdf', path: '/temp/test.pdf' } as any;
      jest.spyOn(service, 'uploadDocument').mockResolvedValue(mockDocument as any);

      const result = await controller.uploadDocument(1, mockFile, { filename: 'test.pdf', description: 'test' });
      expect(result).toEqual(mockDocument);
      expect(service.uploadDocument).toHaveBeenCalledWith(1, mockFile, 'test.pdf', 'test');
    });
  });

  describe('getDocumentsByUser', () => {
    it('should return documents for a user', async () => {
      const mockDocuments = [{ id: 1, filename: 'test.pdf', description: 'test', path: '/uploads/test.pdf', user: { id: 1 } }];
      jest.spyOn(service, 'getDocumentsByUser').mockResolvedValue(mockDocuments as any);

      const result = await controller.getDocumentsByUser(1);
      expect(result).toEqual(mockDocuments);
      expect(service.getDocumentsByUser).toHaveBeenCalledWith(1);
    });
  });

  describe('downloadDocument', () => {
    it('should download a document', async () => {
      const mockFileContent = Buffer.from('file content');
      const res = createMock<Response>({ send: jest.fn() });

      jest.spyOn(service, 'downloadDocument').mockResolvedValue(mockFileContent as any);

      await controller.downloadDocument(1, res);
      expect(service.downloadDocument).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(mockFileContent);
    });
  });

  describe('deleteDocument', () => {
    it('should delete a document', async () => {
      jest.spyOn(service, 'deleteDocument').mockResolvedValue(undefined);

      await controller.deleteDocument(1);
      expect(service.deleteDocument).toHaveBeenCalledWith(1);
    });
  });
});
