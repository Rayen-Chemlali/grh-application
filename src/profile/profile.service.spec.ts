import { Test, TestingModule } from "@nestjs/testing";
import { ProfileService } from "./profile.service";
import { ProfileEntity } from "./entity/profile.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("ProfileService", () => {
  let service: ProfileService;
  let repository: Repository<ProfileEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(ProfileEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    repository = module.get<Repository<ProfileEntity>>(
      getRepositoryToken(ProfileEntity),
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of profiles", async () => {
      const profiles = [new ProfileEntity()];
      jest.spyOn(repository, "find").mockResolvedValue(profiles);

      expect(await service.findAll()).toBe(profiles);
    });
  });

  describe("getProfileById", () => {
    it("should return a profile if found", async () => {
      const profile = new ProfileEntity();
      jest.spyOn(repository, "findOne").mockResolvedValue(profile);

      expect(await service.getProfileById(1)).toBe(profile);
    });

    it("should return undefined if no profile found", async () => {
      jest.spyOn(repository, "findOne").mockResolvedValue(undefined);

      expect(await service.getProfileById(1)).toBeUndefined();
    });
  });
});
