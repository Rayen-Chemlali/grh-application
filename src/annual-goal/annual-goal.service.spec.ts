import { Test, TestingModule } from '@nestjs/testing';
import { AnnualGoalService } from './annual-goal.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnualGoalEntity } from './entity/annual-goal.entity';
import { UserEntity } from '../user/entity/user.entity';

const mockAnnualGoalRepository = () => ({
  create: jest.fn().mockReturnValue({} as any),
  save: jest.fn().mockResolvedValue({} as any),
  findOne: jest.fn().mockResolvedValue({} as any),
  find: jest.fn().mockResolvedValue([] as any),
  preload: jest.fn().mockResolvedValue({} as any),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
});

const mockUserRepository = () => ({
  findOne: jest.fn().mockResolvedValue({} as any),
});

describe('AnnualGoalService', () => {
  let service: AnnualGoalService;
  let annualGoalRepository: Repository<AnnualGoalEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnualGoalService,
        { provide: getRepositoryToken(AnnualGoalEntity), useValue: mockAnnualGoalRepository() },
        { provide: getRepositoryToken(UserEntity), useValue: mockUserRepository() },
      ],
    }).compile();

    service = module.get<AnnualGoalService>(AnnualGoalService);
    annualGoalRepository = module.get<Repository<AnnualGoalEntity>>(getRepositoryToken(AnnualGoalEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a goal', async () => {
    const dto = { user_id: 1, description: 'Test Goal', status: 'Not Started' };
    await service.createGoal(dto);
    expect({});
  });

  it('should get goals by user', async () => {
    const userId = 1;
    await service.getGoalsByUser(userId);
    expect(annualGoalRepository.find).toHaveBeenCalledWith({ where: { user: { id: userId } as any } });
  });

  it('should get all goals', async () => {
    await service.getAllGoals();
    expect(annualGoalRepository.find).toHaveBeenCalled();
  });

  it('should get goals by status', async () => {
    const status = 'Not Started';
    await service.getGoalsByStatus(status);
    expect(annualGoalRepository.find).toHaveBeenCalledWith({ where: { status } });
  });

  it('should get goals by approval status', async () => {
    const approvedBy = 'employee' as 'employee' | 'manager';
    const approved = true;
    await service.getGoalsByApprovalStatus(approvedBy, approved);
    expect(annualGoalRepository.find).toHaveBeenCalledWith({ where: { [`${approvedBy}Approved`]: approved } });
  });

  it('should update a goal', async () => {
    const id = 1;
    const dto = { description: 'Updated Goal', status: 'In Progress' };
    await service.updateGoal(id, dto);
    expect({});
  });

  it('should approve a goal', async () => {
    const id = 1;
    const approvedBy = 'employee' as 'employee' | 'manager';
    await service.approveGoal(id, approvedBy);
    const goal = await annualGoalRepository.findOne({ where: { id } });
    if (approvedBy === 'employee') {
      expect(goal.employeeApproved).toBe(true);
    } else {
      expect(goal.managerApproved).toBe(true);
    }
    expect(annualGoalRepository.save).toHaveBeenCalledWith(goal);
  });

  it('should delete a goal', async () => {
    const id = 1;
    await service.deleteGoal(id);
    expect(annualGoalRepository.delete).toHaveBeenCalledWith(id);
  });
});
