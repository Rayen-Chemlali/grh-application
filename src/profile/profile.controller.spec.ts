import { Test, TestingModule } from "@nestjs/testing";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { ProfileEntity } from "./entity/profile.entity";
import { Reflector } from "@nestjs/core";

describe("ProfileController", () => {
  let controller: ProfileController;
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        Reflector,
        {
          provide: ProfileService,
          useValue: {
            findAll: jest.fn(),
            getProfileById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of profiles", async () => {
      const result = [new ProfileEntity()];
      jest.spyOn(service, "findAll").mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe("getProfileById", () => {
    it("should return a profile by ID", async () => {
      const result = new ProfileEntity();
      jest.spyOn(service, "getProfileById").mockResolvedValue(result);

      expect(await controller.getProfileById(1)).toBe(result);
    });
  });

  describe("create", () => {
    it("should create a new profile", async () => {
      const result = new ProfileEntity();
      const profile: Partial<ProfileEntity> = { bio: "Hello world" };
      jest.spyOn(service, "create").mockResolvedValue(result);

      expect(
        await controller.create(profile, {
          filename: "profile.jpg",
        } as Express.Multer.File),
      ).toBe(result);
    });

    it("should create a new profile without file", async () => {
      const result = new ProfileEntity();
      const profile: Partial<ProfileEntity> = { bio: "Hello world" };
      jest.spyOn(service, "create").mockResolvedValue(result);

      expect(await controller.create(profile, null)).toBe(result);
    });
  });

  describe("update", () => {
    it("should update a profile", async () => {
      const result = new ProfileEntity();
      const profile: Partial<ProfileEntity> = { bio: "Updated bio" };
      jest.spyOn(service, "update").mockResolvedValue(result);

      expect(await controller.update(1, profile)).toBe(result);
    });
  });

  describe("delete", () => {
    it("should delete a profile", async () => {
      const result = undefined;
      jest.spyOn(service, "delete").mockResolvedValue(result);

      expect(await controller.delete(1)).toBe(result);
    });
  });
});
