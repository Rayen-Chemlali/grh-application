
import { Controller, Get, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity.ts';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(): Promise<UserEntity[]> {
        return this.userService.getUsers();
    }

    @Put(':id/role/:roleId')
    async updateUserRole(@Param('id') id: number, @Param('roleId') roleId: number): Promise<UserEntity> {
        return this.userService.updateUserRole(id, roleId);
    }
}
