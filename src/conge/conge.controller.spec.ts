import { Test, TestingModule } from '@nestjs/testing';
import { CongeController } from './conge.controller';
import { CongeService } from './conge.service';
import { CongeEntity } from './entity/conge.entity';

// Mock service implementation
const mockCongeService = () => ({
    createConge: jest.fn().mockResolvedValue({} as CongeEntity),
    getConges: jest.fn().mockResolvedValue([] as CongeEntity[]),
    getConge: jest.fn().mockResolvedValue([] as CongeEntity[]),
    approveConge: jest.fn().mockResolvedValue({} as CongeEntity),
    rejectConge: jest.fn().mockResolvedValue({} as CongeEntity),
    pendingConge: jest.fn().mockResolvedValue({} as CongeEntity),
    deleteConge: jest.fn().mockResolvedValue(undefined),
});

describe('CongeController', () => {
    let controller: CongeController;
    let service: CongeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CongeController],
            providers: [
                {
                    provide: CongeService,
                    useValue: mockCongeService(),
                },
            ],
        }).compile();

        controller = module.get<CongeController>(CongeController);
        service = module.get<CongeService>(CongeService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call createConge and return the result', async () => {
        const startDate = new Date();
        const endDate = new Date();
        const reason = 'Test Reason';

        jest.spyOn(service, 'createConge').mockResolvedValue({} as CongeEntity);

        const result = await controller.createConge(1, startDate, endDate, reason);

        expect(service.createConge).toHaveBeenCalledWith(1, expect.any(Date), expect.any(Date), reason);
        expect(result).toEqual({} as CongeEntity);
    });


    it('should call getConges and return the result', async () => {
        const result = await controller.getConges(1);
        expect(service.getConges).toHaveBeenCalledWith(1);
        expect(result).toEqual([] as CongeEntity[]);
    });

    it('should call getConge and return the result', async () => {
        const result = await controller.getConge(1);
        expect(service.getConge).toHaveBeenCalledWith(1);
        expect(result).toEqual([] as CongeEntity[]);
    });

    it('should call approveConge and return the result', async () => {
        const result = await controller.approveConge(1);
        expect(service.approveConge).toHaveBeenCalledWith(1);
        expect(result).toEqual({} as CongeEntity);
    });

    it('should call rejectConge and return the result', async () => {
        const result = await controller.rejectConge(1);
        expect(service.rejectConge).toHaveBeenCalledWith(1);
        expect(result).toEqual({} as CongeEntity);
    });

    it('should call pendingConge and return the result', async () => {
        const result = await controller.pendingConge(1);
        expect(service.pendingConge).toHaveBeenCalledWith(1);
        expect(result).toEqual({} as CongeEntity);
    });

    it('should call deleteConge and return void', async () => {
        await controller.deleteConge(1);
        expect(service.deleteConge).toHaveBeenCalledWith(1);
    });
});
