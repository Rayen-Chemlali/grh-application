
import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './entity/role.entity.ts';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    async getRoles(): Promise<RoleEntity[]> {
        return this.roleService.getRoles();
    }

    @Put(':id')
    async updateRole(@Param('id') id: number, @Body() roleData: Partial<RoleEntity>): Promise<RoleEntity> {
        return this.roleService.updateRole(id, roleData);
    }
}
