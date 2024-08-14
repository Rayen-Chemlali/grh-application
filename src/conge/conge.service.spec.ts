import { Test, TestingModule } from "@nestjs/testing";
import { CongeService } from "./conge.service";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CongeEntity } from "./entity/conge.entity";
import { UserEntity } from "../user/entity/user.entity";

describe("CongeService", () => {
  let service: CongeService;
  let congeRepository: Repository<CongeEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CongeService,
        {
          provide: getRepositoryToken(CongeEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CongeService>(CongeService);
    congeRepository = module.get<Repository<CongeEntity>>(
      getRepositoryToken(CongeEntity),
    );
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createConge", () => {
    it("should create a new conge", async () => {
      const employee = new UserEntity();
      employee.id = 1;
      employee.manager = new UserEntity();
      employee.manager.id = 2;

      const conge = new CongeEntity();
      conge.id = 1;
      conge.startDate = new Date();
      conge.endDate = new Date();
      conge.reason = "Vacation";
      conge.status = "Pending";
      conge.employee = employee;
      conge.manager = employee.manager;

      jest
        .spyOn(userRepository, "findOne")
        .mockImplementation(async (options: any) => {
          if (options.where.id === 1) {
            return employee;
          }
          if (options.where.id === 2) {
            return employee.manager;
          }
          return undefined;
        });

      jest.spyOn(congeRepository, "create").mockReturnValue(conge);
      jest.spyOn(congeRepository, "save").mockResolvedValue(conge);

      const result = await service.createConge(
        1,
        new Date(),
        new Date(),
        "Vacation",
      );
      expect(result).toEqual(conge);
    });
  });

  describe("getConges", () => {
    it("should return an array of conges", async () => {
      const manager = new UserEntity();
      manager.id = 1;

      const conge = new CongeEntity();
      conge.id = 1;
      conge.startDate = new Date();
      conge.endDate = new Date();
      conge.reason = "Vacation";
      conge.status = "Pending";
      conge.manager = manager;

      jest.spyOn(congeRepository, "find").mockResolvedValue([conge]);

      const result = await service.getConges(1);
      expect(result).toEqual([conge]);
    });
  });

  describe("approveConge", () => {
    it("should approve a conge", async () => {
      const conge = new CongeEntity();
      conge.id = 1;
      conge.status = "Pending";

      jest.spyOn(congeRepository, "findOne").mockResolvedValue(conge);
      jest.spyOn(congeRepository, "save").mockResolvedValue(conge);

      const result = await service.approveConge(1);
      expect(result.status).toEqual("Approved");
    });
  });

  describe("rejectConge", () => {
    it("should reject a conge", async () => {
      const conge = new CongeEntity();
      conge.id = 1;
      conge.status = "Pending";

      jest.spyOn(congeRepository, "findOne").mockResolvedValue(conge);
      jest.spyOn(congeRepository, "save").mockResolvedValue(conge);

      const result = await service.rejectConge(1);
      expect(result.status).toEqual("Rejected");
    });
  });
});
