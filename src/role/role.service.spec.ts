import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from './role.service';
import { RoleEntity } from './entity/role.entity';

describe('RoleService', () => {
  let service: RoleService;
  let roleRepository: Repository<RoleEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(RoleEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    roleRepository = module.get<Repository<RoleEntity>>(getRepositoryToken(RoleEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllRoles', () => {
    it('should return an array of roles', async () => {
      const result: RoleEntity[] = [];
      jest.spyOn(roleRepository, 'find').mockResolvedValue(result);

      expect(await service.getRoles()).toBe(result);
    });
  });

  describe('createRole', () => {
    it('should create and return a new role', async () => {
      const newRole: RoleEntity = new RoleEntity();
      jest.spyOn(roleRepository, 'create').mockReturnValue(newRole);
      jest.spyOn(roleRepository, 'save').mockResolvedValue(newRole);

      expect(await service.addRole(newRole)).toBe(newRole);
    });
  });

  describe('updateRole', () => {
    it('should update and return an updated role', async () => {
      const updatedRole: RoleEntity = new RoleEntity();
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue(updatedRole);
      jest.spyOn(roleRepository, 'save').mockResolvedValue(updatedRole);

      expect(await service.updateRole(1, updatedRole)).toBe(updatedRole);
    });
  });

  describe('deleteRole', () => {
    it('should delete a role', async () => {
      const role: RoleEntity = new RoleEntity();
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue(role);
      jest.spyOn(roleRepository, 'remove').mockResolvedValue(role);

      expect(await service.deleteRole(1)).toBeUndefined();
    });
  });
});
