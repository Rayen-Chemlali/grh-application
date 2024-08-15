import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';

@Controller('evaluations')
export class EvaluationController {
    constructor(private readonly evaluationService: EvaluationService) {}

    @Post()
    createEvaluation(@Body() createEvaluationDto: CreateEvaluationDto) {
        return this.evaluationService.createEvaluation(createEvaluationDto);
    }

    @Get('user/:userId')
    getEvaluationsByUser(@Param('userId') userId: number) {
        return this.evaluationService.getEvaluationsByUser(userId);
    }
}
