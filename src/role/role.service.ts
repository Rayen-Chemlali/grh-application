import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entity/role.entity.ts';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {}

    async getRoles(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }

    async updateRole(id: number, roleData: Partial<RoleEntity>): Promise<RoleEntity> {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new Error(`Role with ID ${id} not found`);
        }
        Object.assign(role, roleData);
        return this.roleRepository.save(role);
    }
}
