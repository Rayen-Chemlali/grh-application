import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        const project = this.projectRepository.create(createProjectDto);
        return this.projectRepository.save(project);
    }

    async getProjects(): Promise<ProjectEntity[]> {
        return this.projectRepository.find({ relations: ['users'] });
    }

    async getProjectsByStatus(status: string): Promise<ProjectEntity[]> {
        return this.projectRepository.find({
            where: { status },
            relations: ['users'],
        });
    }

    async getProjectsByProjectManager(projectManagerId: number): Promise<ProjectEntity[]> {
        return this.projectRepository.find({
            where: { projectManager: { id: projectManagerId } },
            relations: ['users'],
        } as any);
    }

    async updateProject(id: number, updateProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        const project = await this.projectRepository.preload({
            id,
            ...updateProjectDto,
        } as any);

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return this.projectRepository.save(project);
    }

    async assignUserToProject(projectId: number, userId: number): Promise<ProjectEntity> {
        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: ['users'],
        });

        const user = await this.userRepository.findOne(userId as any);

        if (!project || !user) {
            throw new NotFoundException('Project or User not found');
        }

        if (!project.users.some(u => u.id === userId)) {
            project.users.push(user);
        }

        return this.projectRepository.save(project);
    }

    async unassignUserFromProject(projectId: number, userId: number): Promise<ProjectEntity> {
        const project = await this.projectRepository.findOne({
            where: { id: projectId },
            relations: ['users'],
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        project.users = project.users.filter(user => user.id !== userId);

        return this.projectRepository.save(project);
    }

    async getUserProjects(userId: number): Promise<ProjectEntity[]> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['projects'],
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user.projects;
    }
}
