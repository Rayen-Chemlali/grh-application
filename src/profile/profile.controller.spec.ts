import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileEntity } from './entity/profile.entity';
import { ProfileDTO } from './dto/create-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: {
            findAll: jest.fn(),
            getProfileById: jest.fn(),
            createOrUpdateProfile: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of profiles', async () => {
      const result = [new ProfileEntity()];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('getProfileById', () => {
    it('should return a profile by ID', async () => {
      const result = new ProfileEntity();
      jest.spyOn(service, 'getProfileById').mockResolvedValue(result);

      expect(await controller.getProfileById(1)).toBe(result);
    });
  });

  describe('createProfile', () => {
    it('should create a new profile with an image', async () => {
      const result = new ProfileEntity();
      const createProfileDto: ProfileDTO = { nom: 'John', image: 'image.jpg' };
      const file = { filename: 'image.jpg' } as Express.Multer.File;
      jest.spyOn(service, 'createOrUpdateProfile').mockResolvedValue(result);

      expect(
          await controller.createProfile(1, createProfileDto, file),
      ).toBe(result);
    });

    it('should create a new profile without an image', async () => {
      const result = new ProfileEntity();
      const createProfileDto: ProfileDTO = { nom: 'John' };
      jest.spyOn(service, 'createOrUpdateProfile').mockResolvedValue(result);

      expect(
          await controller.createProfile(1, createProfileDto, null),
      ).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a profile', async () => {
      const result = new ProfileEntity();
      const profile: Partial<ProfileEntity> = { nom: 'John Doe' };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, profile)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a profile', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);

      expect(await controller.delete(1)).toBeUndefined();
    });
  });
});
