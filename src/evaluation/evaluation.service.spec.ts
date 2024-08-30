import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationService } from './evaluation.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluationEntity } from './entity/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { UserEntity } from '../user/entity/user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('EvaluationService', () => {
    let service: EvaluationService;
    let evaluationRepository: Repository<EvaluationEntity>;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EvaluationService,
                {
                    provide: getRepositoryToken(EvaluationEntity),
                    useValue: {
                        find: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        findOne: jest.fn(), // Update to findOne
                    },
                },
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<EvaluationService>(EvaluationService);
        evaluationRepository = module.get<Repository<EvaluationEntity>>(getRepositoryToken(EvaluationEntity));
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createEvaluation', () => {
        it('should create a new evaluation', async () => {
            const createEvaluationDto: CreateEvaluationDto = {
                comments: 'Good performance',
                evaluationDate: new Date().toISOString(),
                employeeRating: 'A',
                managerRating: 'B',
                userId: 1,
            };
            const user = new UserEntity();
            user.id = 1;
            const manager = new UserEntity();
            manager.id = 2;

            const newEvaluation = new EvaluationEntity();
            jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user).mockResolvedValueOnce(manager);
            jest.spyOn(evaluationRepository, 'create').mockReturnValue(newEvaluation);
            jest.spyOn(evaluationRepository, 'save').mockResolvedValue(newEvaluation);

            expect(await service.createEvaluation(createEvaluationDto)).toBe(newEvaluation);
        });

        it('should throw NotFoundException if user or manager is not found', async () => {
            const createEvaluationDto: CreateEvaluationDto = {
                comments: 'Good performance',
                evaluationDate: new Date().toISOString(),
                employeeRating: 'A',
                managerRating: 'B',
                userId: 999,
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null).mockResolvedValueOnce(new UserEntity());

            await expect(service.createEvaluation(createEvaluationDto)).rejects.toThrow(NotFoundException);
        });

        it('should throw BadRequestException for missing fields', async () => {
            const createEvaluationDto: CreateEvaluationDto = {
                comments: '',
                evaluationDate: '',
                employeeRating: 'A',
                managerRating: 'B',
                userId: 1,
            };

            await expect(service.createEvaluation(createEvaluationDto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('getEvaluationsByManager', () => {
        it('should return an array of evaluations by manager ID', async () => {
            const result = [new EvaluationEntity()];
            jest.spyOn(evaluationRepository, 'find').mockResolvedValue(result);

            expect(await service.getEvaluationsByManager(1)).toBe(result);
        });
    });

    describe('getEvaluationsByUser', () => {
        it('should return an array of evaluations by user ID', async () => {
            const result = [new EvaluationEntity()];
            jest.spyOn(evaluationRepository, 'find').mockResolvedValue(result);

            expect(await service.getEvaluationsByUser(1)).toBe(result);
        });
    });

});
