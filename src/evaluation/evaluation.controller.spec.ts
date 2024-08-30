import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { EvaluationEntity } from './entity/evaluation.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('EvaluationController', () => {
    let controller: EvaluationController;
    let service: EvaluationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EvaluationController],
            providers: [
                {
                    provide: EvaluationService,
                    useValue: {
                        createEvaluation: jest.fn(),
                        getEvaluationsByUser: jest.fn(),
                        getEvaluationsByManager: jest.fn(),
                        update: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<EvaluationController>(EvaluationController);
        service = module.get<EvaluationService>(EvaluationService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
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
            const result = new EvaluationEntity();
            jest.spyOn(service, 'createEvaluation').mockResolvedValue(result);

            expect(await controller.createEvaluation(createEvaluationDto)).toBe(result);
        });

        it('should handle BadRequestException from service', async () => {
            const createEvaluationDto: CreateEvaluationDto = {
                comments: '',
                evaluationDate: '',
                employeeRating: 'A',
                managerRating: 'B',
                userId: 1,
            };

            jest.spyOn(service, 'createEvaluation').mockRejectedValue(new BadRequestException());

            await expect(controller.createEvaluation(createEvaluationDto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('getEvaluationsByUser', () => {
        it('should return evaluations by user ID', async () => {
            const result = [new EvaluationEntity()];
            jest.spyOn(service, 'getEvaluationsByUser').mockResolvedValue(result);

            expect(await controller.getEvaluationsByUser(1)).toBe(result);
        });
    });

    describe('getEvaluationsByManager', () => {
        it('should return evaluations by manager ID', async () => {
            const result = [new EvaluationEntity()];
            jest.spyOn(service, 'getEvaluationsByManager').mockResolvedValue(result);

            expect(await controller.getEvaluationsByManager(1)).toBe(result);
        });
    });

    describe('update', () => {
        it('should update an evaluation', async () => {
            const updateEvaluationDto: UpdateEvaluationDto = {
                employeeRating: 'B',
                managerRating: 'C',
            };
            const result = new EvaluationEntity();
            jest.spyOn(service, 'update').mockResolvedValue(result);

            expect(await controller.update(1, updateEvaluationDto)).toBe(result);
        });

        it('should handle NotFoundException from service', async () => {
            const updateEvaluationDto: UpdateEvaluationDto = {
                employeeRating: 'B',
                managerRating: 'C',
            };

            jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

            await expect(controller.update(1, updateEvaluationDto)).rejects.toThrow(NotFoundException);
        });
    });
});
