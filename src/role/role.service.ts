import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entity/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {}

    async getRoles(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }

    async addRole(roleData: Partial<RoleEntity>): Promise<RoleEntity> {
        const role = this.roleRepository.create(roleData);
        return this.roleRepository.save(role);
    }

    async updateRole(id: number, roleData: Partial<RoleEntity>): Promise<RoleEntity> {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new Error(`Role with ID ${id} not found`);
        }
        Object.assign(role, roleData);
        return this.roleRepository.save(role);
    }

    async deleteRole(id: number): Promise<void> {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new Error(`Role with ID ${id} not found`);
        }
        await this.roleRepository.remove(role);
    }
}
