import { Test, TestingModule } from '@nestjs/testing';
import { AnnualGoalController } from './annual-goal.controller';
import { AnnualGoalService } from './annual-goal.service';
import { CreateAnnualGoalDto } from './dto/create-annual-goal.dto';
import { UpdateAnnualGoalDto } from './dto/update-annual-goal.dto';

const mockAnnualGoalService = () => ({
  createGoal: jest.fn().mockResolvedValue({} as any),
  getGoalsByUser: jest.fn().mockResolvedValue([] as any),
  getAllGoals: jest.fn().mockResolvedValue([] as any),
  getGoalsByStatus: jest.fn().mockResolvedValue([] as any),
  getGoalsByApprovalStatus: jest.fn().mockResolvedValue([] as any),
  updateGoal: jest.fn().mockResolvedValue({} as any),
  approveGoal: jest.fn().mockResolvedValue({} as any),
  deleteGoal: jest.fn().mockResolvedValue(undefined),
});

describe('AnnualGoalController', () => {
  let controller: AnnualGoalController;
  let service: AnnualGoalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnualGoalController],
      providers: [
        {
          provide: AnnualGoalService,
          useValue: mockAnnualGoalService(),
        },
      ],
    }).compile();

    controller = module.get<AnnualGoalController>(AnnualGoalController);
    service = module.get<AnnualGoalService>(AnnualGoalService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a goal', async () => {
    const dto: CreateAnnualGoalDto = { user_id: 1, description: 'Test Goal', status: 'Not Started' };
    await controller.createGoal(dto);
    expect(service.createGoal).toHaveBeenCalledWith(dto);
  });

  it('should get goals by user', async () => {
    const userId = 1;
    await controller.getGoalsByUser(userId);
    expect(service.getGoalsByUser).toHaveBeenCalledWith(userId);
  });

  it('should get all goals', async () => {
    await controller.getAllGoals();
    expect(service.getAllGoals).toHaveBeenCalled();
  });

  it('should get goals by status', async () => {
    const status = 'Not Started';
    await controller.getGoalsByStatus(status);
    expect(service.getGoalsByStatus).toHaveBeenCalledWith(status);
  });

  it('should get goals by approval status', async () => {
    await controller.getGoalsByApprovalStatus('employee', true);
    expect(service.getGoalsByApprovalStatus).toHaveBeenCalledWith('employee', true);
  });

  it('should update a goal', async () => {
    const id = 1;
    const dto: UpdateAnnualGoalDto = { description: 'Updated Goal', status: 'In Progress' };
    await controller.updateGoal(id.toString(), dto);
    expect(service.updateGoal).toHaveBeenCalledWith(id, dto);
  });

  it('should approve a goal', async () => {
    const dto = { approvedBy: 'employee' as 'employee' | 'manager' };
    await controller.approveGoal(1, dto);
    expect(service.approveGoal).toHaveBeenCalledWith(1, 'employee');
  });

  it('should delete a goal', async () => {
    await controller.deleteGoal(1);
    expect(service.deleteGoal).toHaveBeenCalledWith(1);
  });
});
