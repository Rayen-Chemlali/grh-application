import { Test, TestingModule } from '@nestjs/testing';
import { AnnualGoalService } from './annual-goal.service';

describe('AnnualgoalService', () => {
  let service: AnnualGoalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnualGoalService],
    }).compile();

    service = module.get<AnnualGoalService>(AnnualgoalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
