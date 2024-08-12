import { Test, TestingModule } from '@nestjs/testing';
import { AnnualgoalController } from './annual-goal.controller';

describe('AnnualgoalController', () => {
  let controller: AnnualgoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnualgoalController],
    }).compile();

    controller = module.get<AnnualgoalController>(AnnualgoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
