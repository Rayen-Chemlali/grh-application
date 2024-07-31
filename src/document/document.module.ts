import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentEntity } from './entity/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
