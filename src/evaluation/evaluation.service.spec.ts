import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationService } from './evaluation.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluationEntity } from './entity/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { UserEntity } from '../user/entity/user.entity';
import { AnnualGoalEntity } from '../annual-goal/entity/annual-goal.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('EvaluationService', () => {
    let service: EvaluationService;
    let evaluationRepository: Repository<EvaluationEntity>;
    let userRepository: Repository<UserEntity>;
    let goalRepository: Repository<AnnualGoalEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EvaluationService,
                {
                    provide: getRepositoryToken(EvaluationEntity),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(AnnualGoalEntity),
                    useValue: {
                        findOne: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<EvaluationService>(EvaluationService);
        evaluationRepository = module.get<Repository<EvaluationEntity>>(getRepositoryToken(EvaluationEntity));
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
        goalRepository = module.get<Repository<AnnualGoalEntity>>(getRepositoryToken(AnnualGoalEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getEvaluationsByManager', () => {
        it('should return evaluations by manager ID', async () => {
            const managerId = 1;
            const evaluations = [new EvaluationEntity()];
            jest.spyOn(evaluationRepository, 'find').mockResolvedValue(evaluations);

            const result = await service.getEvaluationsByManager(managerId);
            expect(result).toBe(evaluations);
            expect(evaluationRepository.find).toHaveBeenCalledWith({
                where: { manager: { id: managerId } },
                relations: ['manager', 'user', 'goal'],
            });
        });
    });

    describe('getEvaluationsByUser', () => {
        it('should return evaluations by user ID', async () => {
            const userId = 1;
            const evaluations = [new EvaluationEntity()];
            jest.spyOn(evaluationRepository, 'find').mockResolvedValue(evaluations);

            const result = await service.getEvaluationsByUser(userId);
            expect(result).toBe(evaluations);
            expect(evaluationRepository.find).toHaveBeenCalledWith({
                where: { user: { id: userId } },
                relations: ['user', 'goal'],
            });
        });
    });

    describe('createEvaluation', () => {
        it('should create and return a new evaluation', async () => {
            const createEvaluationDto: CreateEvaluationDto = {
                userId: 1,
                goalId: 1,
                comments: 'Excellent performance',
                evaluationDate: new Date().toISOString(),
                employeeRating: 'A',
                managerRating: 'B',
            };

            const user = new UserEntity();
            user.id = createEvaluationDto.userId;
            user.manager = new UserEntity(); // Assuming the manager exists

            const goal = new AnnualGoalEntity();
            goal.id = createEvaluationDto.goalId;
            goal.evaluations = [];

            const newEvaluation = new EvaluationEntity();
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
            jest.spyOn(goalRepository, 'findOne').mockResolvedValue(goal);
            jest.spyOn(evaluationRepository, 'create').mockReturnValue(newEvaluation);
            jest.spyOn(evaluationRepository, 'save').mockResolvedValue(newEvaluation);
            jest.spyOn(goalRepository, 'save').mockResolvedValue(goal);

            const result = await service.createEvaluation(createEvaluationDto);
            expect(result).toBe(newEvaluation);
            expect(evaluationRepository.save).toHaveBeenCalledWith(newEvaluation);
            expect(goalRepository.save).toHaveBeenCalledWith(goal);
        });

        it('should throw NotFoundException if user or manager is not found', async () => {
            const createEvaluationDto: CreateEvaluationDto = {
                userId: 999,
                goalId: 1,
                comments: 'Excellent performance',
                evaluationDate: new Date().toISOString(),
                employeeRating: 'A',
                managerRating: 'B',
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

            await expect(service.createEvaluation(createEvaluationDto)).rejects.toThrow(NotFoundException);
        });

        it('should throw NotFoundException if goal is not found', async () => {
            const createEvaluationDto: CreateEvaluationDto = {
                userId: 1,
                goalId: 999,
                comments: 'Excellent performance',
                evaluationDate: new Date().toISOString(),
                employeeRating: 'A',
                managerRating: 'B',
            };

            const user = new UserEntity();
            user.id = createEvaluationDto.userId;
            user.manager = new UserEntity(); // Assuming the manager exists

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
            jest.spyOn(goalRepository, 'findOne').mockResolvedValue(null);

            await expect(service.createEvaluation(createEvaluationDto)).rejects.toThrow(NotFoundException);
        });

        it('should throw BadRequestException for missing fields', async () => {
            const createEvaluationDto: CreateEvaluationDto = {
                userId: 1,
                goalId: 1,
                comments: '',
                evaluationDate: '', // Adjust according to the validation rules
                employeeRating: 'A',
                managerRating: 'B',
            };

            await expect(service.createEvaluation(createEvaluationDto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('update', () => {
        it('should update and return an evaluation', async () => {
            const id = 1;
            const updateEvaluationDto: Partial<UpdateEvaluationDto> = {
                employeeRating: 'B',
                managerRating: 'A',
            };

            const existingEvaluation = new EvaluationEntity();
            existingEvaluation.id = id;
            existingEvaluation.employeeRating = 'A';
            existingEvaluation.managerRating = 'B';

            jest.spyOn(evaluationRepository, 'findOne').mockResolvedValue(existingEvaluation);
            jest.spyOn(evaluationRepository, 'save').mockResolvedValue({
                ...existingEvaluation,
                ...updateEvaluationDto,
            });

            const result = await service.update(id, updateEvaluationDto);
            expect(result).toEqual({
                ...existingEvaluation,
                ...updateEvaluationDto,
            });
            expect(evaluationRepository.save).toHaveBeenCalledWith({
                ...existingEvaluation,
                ...updateEvaluationDto,
            });
        });

        it('should throw NotFoundException if evaluation is not found', async () => {
            const id = 999;
            const updateEvaluationDto: Partial<UpdateEvaluationDto> = {
                employeeRating: 'B',
                managerRating: 'A',
            };

            jest.spyOn(evaluationRepository, 'findOne').mockResolvedValue(null);

            await expect(service.update(id, updateEvaluationDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getEvaluationsByGoal', () => {
        it('should return evaluations by goal ID', async () => {
            const goalId = 1;
            const evaluations = [new EvaluationEntity()];
            const goal = new AnnualGoalEntity();
            goal.id = goalId;
            goal.evaluations = evaluations;

            jest.spyOn(goalRepository, 'findOne').mockResolvedValue(goal);

            const result = await service.getEvaluationsByGoal(goalId);
            expect(result).toBe(evaluations);
            expect(goalRepository.findOne).toHaveBeenCalledWith({
                where: { id: goalId },
                relations: ['evaluations'],
            });
        });

        it('should throw NotFoundException if goal is not found', async () => {
            const goalId = 999;

            jest.spyOn(goalRepository, 'findOne').mockResolvedValue(null);

            await expect(service.getEvaluationsByGoal(goalId)).rejects.toThrow(NotFoundException);
        });


    });
});
