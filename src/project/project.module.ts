import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {UserEntity} from "../user/entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity,UserEntity])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
