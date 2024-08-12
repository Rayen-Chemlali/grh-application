import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnualGoalEntity } from './entity/annual-goal.entity';
import { AnnualGoalService } from './annual-goal.service';
import { AnnualGoalController } from './annual-goal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AnnualGoalEntity])],
  providers: [AnnualGoalService],
  controllers: [AnnualGoalController],
})
export class AnnualGoalModule {}
