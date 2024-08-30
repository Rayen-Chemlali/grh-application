import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluationEntity } from './entity/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { UserEntity } from '../user/entity/user.entity';
import { AnnualGoalEntity } from '../annual-goal/entity/annual-goal.entity';

@Injectable()
export class EvaluationService {
    constructor(
        @InjectRepository(EvaluationEntity)
        private evaluationRepository: Repository<EvaluationEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(AnnualGoalEntity)
        private goalRepository: Repository<AnnualGoalEntity>,
    ) {}

    async getEvaluationsByManager(managerId: number): Promise<EvaluationEntity[]> {
        return this.evaluationRepository.find({
            where: { manager: { id: managerId } },
            relations: ['manager', 'user', 'goal'],
        });
    }

    async getEvaluationsByUser(userId: number): Promise<EvaluationEntity[]> {
        return this.evaluationRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'goal'],
        });
    }
    async createEvaluation(createEvaluationDto: CreateEvaluationDto): Promise<EvaluationEntity> {
        const { userId, goalId, comments, evaluationDate, employeeRating, managerRating } = createEvaluationDto;

        if (!userId || !goalId || !comments || !evaluationDate) {
            throw new BadRequestException('Missing required fields');
        }

        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['manager'],
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const manager = user.manager;
        if (!manager) {
            throw new NotFoundException('Manager not found');
        }

        const goal = await this.goalRepository.findOne({
            where: { id: goalId },
            relations: ['evaluations'],
        });

        if (!goal) {
            throw new NotFoundException('Goal not found');
        }

        const newEvaluation = this.evaluationRepository.create({
            user,
            manager,
            goal,
            comments,
            evaluationDate,
            employeeRating,
            managerRating,
        });

        // Save the new evaluation
        const savedEvaluation = await this.evaluationRepository.save(newEvaluation);

        goal.evaluations.push(savedEvaluation);
        await this.goalRepository.save(goal);

        return savedEvaluation;
    }


    async update(id: number, updateEvaluationDto: UpdateEvaluationDto): Promise<EvaluationEntity> {
        const evaluation = await this.evaluationRepository.findOne({
            where: { id },
        });

        if (!evaluation) {
            throw new NotFoundException('Evaluation not found');
        }

        return this.evaluationRepository.save({
            ...evaluation,
            ...updateEvaluationDto,
        });
    }


    async getEvaluationsByGoal(goalId: number): Promise<EvaluationEntity[]> {
        const goal = await this.goalRepository.findOne({
            where: { id: goalId },
            relations: ['evaluations'],
        });

        if (!goal) {
            throw new NotFoundException('Goal not found');
        }

        // Optionally: check if evaluations are related to the goal
        if (!goal.evaluations) {
            throw new NotFoundException('No evaluations found for this goal');
        }

        return goal.evaluations;
    }
}
