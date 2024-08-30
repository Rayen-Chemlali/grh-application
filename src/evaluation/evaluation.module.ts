import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationEntity } from './entity/evaluation.entity';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import {UserEntity} from "../user/entity/user.entity";
import {ProjectEntity} from "../project/entity/project.entity";
import {UserService} from "../user/user.service";
import {AnnualGoalEntity} from "../annual-goal/entity/annual-goal.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationEntity,UserEntity,ProjectEntity,AnnualGoalEntity])],
  providers: [EvaluationService],
  controllers: [EvaluationController],
  exports: [EvaluationService, TypeOrmModule],

})
export class EvaluationModule {}