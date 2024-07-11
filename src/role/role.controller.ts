import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './entity/role.entity';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    async getRoles(): Promise<RoleEntity[]> {
        return this.roleService.getRoles();
    }

    @Post()
    async addRole(@Body() roleData: Partial<RoleEntity>): Promise<RoleEntity> {
        return this.roleService.addRole(roleData);
    }

    @Put(':id')
    async updateRole(@Param('id') id: number, @Body() roleData: Partial<RoleEntity>): Promise<RoleEntity> {
        return this.roleService.updateRole(id, roleData);
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: number): Promise<void> {
        return this.roleService.deleteRole(id);
    }
}
