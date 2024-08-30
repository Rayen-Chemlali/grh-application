import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { EvaluationEntity } from './entity/evaluation.entity';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Controller('evaluations')
export class EvaluationController {
    constructor(private readonly evaluationService: EvaluationService) {}

    @Post()
    createEvaluation(@Body() createEvaluationDto: CreateEvaluationDto) {
        return this.evaluationService.createEvaluation(createEvaluationDto);
    }
    @Get('by-goal/:goalId')
    async getEvaluationsByGoal(@Param('goalId') goalId: number): Promise<EvaluationEntity[]> {
        return this.evaluationService.getEvaluationsByGoal(goalId);
    }

    @Get('user/:userId')
    getEvaluationsByUser(@Param('userId') userId: number) {
        return this.evaluationService.getEvaluationsByUser(userId);
    }

    @Get('manager/:managerId')
    getEvaluationsByManager(@Param('managerId') managerId: number) {
        return this.evaluationService.getEvaluationsByManager(managerId);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateEvaluationDto: UpdateEvaluationDto,
    ): Promise<EvaluationEntity> {
        return this.evaluationService.update(id, updateEvaluationDto);
    }
}
