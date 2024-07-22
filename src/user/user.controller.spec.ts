import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: jest.fn(),
            getManagerUsers: jest.fn(),
            signUp: jest.fn(),
            updateUser: jest.fn(),
            updateUserRole: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result: UserEntity[] = [];
      jest.spyOn(service, 'getUsers').mockResolvedValue(result);

      expect(await controller.getUsers()).toBe(result);
    });
  });

  describe('getManagerUsers', () => {
    it('should return an array of manager users', async () => {
      const result: UserEntity[] = [];
      jest.spyOn(service, 'getManagerUsers').mockResolvedValue(result);

      expect(await controller.getManagerUsers()).toBe(result);
    });
  });

  describe('signUp', () => {
    it('should create and return a user', async () => {
      const result: UserEntity = new UserEntity();
      const createUserDto: CreateUserDto = { username: 'test', password: 'test', email: 'test@test.com', roleId: 1 };
      jest.spyOn(service, 'signUp').mockResolvedValue(result);

      expect(await controller.signUp(createUserDto)).toBe(result);
    });
  });

  describe('updateUser', () => {
    it('should update and return a user', async () => {
      const result: UserEntity = new UserEntity();
      const updateUserDto: UpdateUserDto = { username: 'test', password: 'test', email: 'test@test.com' };
      jest.spyOn(service, 'updateUser').mockResolvedValue(result);

      expect(await controller.updateUser(1, updateUserDto)).toBe(result);
    });
  });

  describe('updateUserRole', () => {
    it('should update the role of a user and return the updated user', async () => {
      const result: UserEntity = new UserEntity();
      jest.spyOn(service, 'updateUserRole').mockResolvedValue(result);

      expect(await controller.updateUserRole(1, 1)).toBe(result);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      jest.spyOn(service, 'deleteUser').mockResolvedValue(undefined);

      expect(await controller.deleteUser(1)).toBe(undefined);
    });
  });
});
