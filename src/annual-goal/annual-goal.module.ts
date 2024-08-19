import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnualGoalEntity } from './entity/annual-goal.entity';
import { AnnualGoalService } from './annual-goal.service';
import { AnnualGoalController } from './annual-goal.controller';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnnualGoalEntity, UserEntity])],
  providers: [AnnualGoalService],
  controllers: [AnnualGoalController],
})
export class AnnualGoalModule {}
