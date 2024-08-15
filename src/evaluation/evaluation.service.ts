import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluationEntity } from './entity/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import {UserEntity} from "../user/entity/user.entity";
import {ProjectEntity} from "../project/entity/project.entity";


@Injectable()
export class EvaluationService {
    constructor(
        @InjectRepository(EvaluationEntity)
        private evaluationRepository: Repository<EvaluationEntity>,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
    ) {}

    async createEvaluation(createEvaluationDto: CreateEvaluationDto): Promise<EvaluationEntity> {
        const user = await this.userRepository.findOne(createEvaluationDto.userId as any);
        const project = await this.projectRepository.findOne(createEvaluationDto.projectId as any);

        if (!user) {
            throw new Error('User not found');
        }

        if (!project) {
            throw new Error('Project not found');
        }

        const data={createEvaluationDto,user,project};
        const evaluation = this.evaluationRepository.create(data)

        return this.evaluationRepository.save(evaluation);
    }

    async getEvaluationsByUser(userId: number): Promise<EvaluationEntity[]> {
        return this.evaluationRepository.find({
            where: { user: { id: userId } },
            relations: ['project']
        } as any);
    }
}
