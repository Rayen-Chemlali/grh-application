import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RoleEntity } from "../role/entity/role.entity";

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;
  let roleRepository: Repository<RoleEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(RoleEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    roleRepository = module.get<Repository<RoleEntity>>(getRepositoryToken(RoleEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result: UserEntity[] = [];
      jest.spyOn(userRepository, 'find').mockResolvedValue(result);

      expect(await service.getUsers()).toBe(result);
    });
  });


  describe('updateUserRole', () => {
    it('should update the role of a user and return the updated user', async () => {
      const user = new UserEntity();
      const role = new RoleEntity();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue(role);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      expect(await service.updateUserRole(1, 1)).toBe(user);
    });
  });

  describe('signUp', () => {
    it('should create and return a user', async () => {
      const createUserDto: CreateUserDto = { username: 'test', password: 'test', email: 'test@test.com', roleId: 1 };
      const role = new RoleEntity();
      const user = new UserEntity();
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue(role);
      jest.spyOn(userRepository, 'create').mockReturnValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

      expect(await service.signUp(createUserDto)).toBe(user);
    });
  });

  describe('updateUser', () => {
    it('should update and return a user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'test', password: 'test', email: 'test@test.com' };
      const user = new UserEntity();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never );

      expect(await service.updateUser(1, updateUserDto)).toBe(user);
    });
  });


  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = new UserEntity();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(user);

      expect(await service.deleteUser(1)).toBeUndefined();
    });
  });

  describe('getUsersByRole', () => {
    it('should return an array of users for a given roleId', async () => {
      const roleId = 1;
      const users: UserEntity[] = [
        { id: 1, username: 'user1', role: { id: roleId } } as UserEntity,
        { id: 2, username: 'user2', role: { id: roleId } } as UserEntity,
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await service.getUsersByRole(roleId);
      expect(result).toEqual(users);
      expect(userRepository.find).toHaveBeenCalledWith({
        where: { role: { id: roleId } },
        relations: ['role'],
      });
    });
  });
});

