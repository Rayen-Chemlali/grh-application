import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from './entity/role.entity';

describe('RoleController', () => {
  let controller: RoleController;
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: {
            getRoles: jest.fn(),
            getRoleById: jest.fn(),
            createRole: jest.fn(),
            updateRole: jest.fn(),
            deleteRole: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRoles', () => {
    it('should return an array of roles', async () => {
      const result: RoleEntity[] = [];
      jest.spyOn(service, 'getRoles').mockResolvedValue(result);

      expect(await controller.getRoles()).toBe(result);
    });
  });

  describe('updateRole', () => {
    it('should update and return an updated role', async () => {
      const updatedRole: RoleEntity = new RoleEntity();
      jest.spyOn(service, 'updateRole').mockResolvedValue(updatedRole);

      expect(await controller.updateRole(1, updatedRole)).toBe(updatedRole);
    });
  });

  describe('deleteRole', () => {
    it('should delete a role', async () => {
      jest.spyOn(service, 'deleteRole').mockResolvedValue(undefined);

      expect(await controller.deleteRole(1)).toBe(undefined);
    });
  });

});
