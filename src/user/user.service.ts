import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity.ts';
import { RoleEntity } from '../role/entity/role.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {}

    async getUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async updateUserRole(id: number, roleId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }

        const role = await this.roleRepository.findOne({ where: { id: roleId } });
        if (!role) {
            throw new Error(`Role with ID ${roleId} not found`);
        }

        user.role = role;
        return this.userRepository.save(user);
    }
}
