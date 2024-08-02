import { Test, TestingModule } from "@nestjs/testing";
import { ProfileService } from "./profile.service";
import { ProfileEntity } from "./entity/profile.entity";
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("ProfileService", () => {
  let service: ProfileService;
  let profileRepository: Repository<ProfileEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(ProfileEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    profileRepository = module.get<Repository<ProfileEntity>>(getRepositoryToken(ProfileEntity));
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of profiles", async () => {
      const profiles = [new ProfileEntity()];
      jest.spyOn(profileRepository, "find").mockResolvedValue(profiles);

      expect(await service.findAll()).toBe(profiles);
    });
  });

  describe("getProfileById", () => {
    it("should return a profile if found", async () => {
      const profile = new ProfileEntity();
      jest.spyOn(profileRepository, "findOne").mockResolvedValue(profile);

      expect(await service.getProfileById(1)).toBe(profile);
    });

    it("should return undefined if no profile found", async () => {
      jest.spyOn(profileRepository, "findOne").mockResolvedValue(undefined);

      expect(await service.getProfileById(1)).toBeUndefined();
    });
  });
});
