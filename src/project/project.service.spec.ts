import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserEntity } from '../user/entity/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProjectService', () => {
    let service: ProjectService;
    let projectRepository: Repository<ProjectEntity>;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProjectService,
                {
                    provide: getRepositoryToken(ProjectEntity),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        preload: jest.fn(),
                        remove: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ProjectService>(ProjectService);
        projectRepository = module.get<Repository<ProjectEntity>>(
            getRepositoryToken(ProjectEntity),
        );
        userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createProject', () => {
        it('should create a new project', async () => {
            const createProjectDto: CreateProjectDto = {
                name: 'New Project',
                description: 'Project Description',
                startDate: new Date(),
                endDate: new Date(),
                users: [],
            };
            const result = new ProjectEntity();
            jest.spyOn(projectRepository, 'create').mockReturnValue(result);
            jest.spyOn(projectRepository, 'save').mockResolvedValue(result);

            expect(await service.createProject(createProjectDto)).toBe(result);
        });
    });

    describe('getProjects', () => {
        it('should return an array of projects', async () => {
            const result = [new ProjectEntity()];
            jest.spyOn(projectRepository, 'find').mockResolvedValue(result);

            expect(await service.getProjects()).toBe(result);
        });
    });

    describe('getProjectsByStatus', () => {
        it('should return an array of projects by status', async () => {
            const result = [new ProjectEntity()];
            jest.spyOn(projectRepository, 'find').mockResolvedValue(result);

            expect(await service.getProjectsByStatus('ongoing')).toBe(result);
        });
    });

    describe('getProjectsByProjectManager', () => {
        it('should return an array of projects by project manager ID', async () => {
            const result = [new ProjectEntity()];
            jest.spyOn(projectRepository, 'find').mockResolvedValue(result);

            expect(await service.getProjectsByProjectManager(1)).toBe(result);
        });
    });

    describe('deleteProject', () => {
        it('should delete a project', async () => {
            const project = new ProjectEntity();
            jest.spyOn(projectRepository, 'findOne').mockResolvedValue(project);
            jest.spyOn(projectRepository, 'remove').mockResolvedValue(undefined);

            await service.deleteProject(1);
            expect(projectRepository.remove).toHaveBeenCalledWith(project);
        });

        it('should throw an error if project is not found', async () => {
            jest.spyOn(projectRepository, 'findOne').mockResolvedValue(null);

            await expect(service.deleteProject(1)).rejects.toThrowError('project with ID 1 not found');
        });
    });

    describe('updateProject', () => {
        it('should update a project', async () => {
            const updateProjectDto: CreateProjectDto = {
                name: 'Updated Project',
                description: 'Updated Description',
                startDate: new Date(),
                endDate: new Date(),
                users: [],
            };
            const project = new ProjectEntity();
            jest.spyOn(projectRepository, 'preload').mockResolvedValue(project);
            jest.spyOn(projectRepository, 'save').mockResolvedValue(project);

            expect(await service.updateProject(1, updateProjectDto)).toBe(project);
        });

        it('should throw a NotFoundException if project is not found', async () => {
            jest.spyOn(projectRepository, 'preload').mockResolvedValue(null);

            await expect(service.updateProject(1, { name: 'test' } as any)).rejects.toThrow(NotFoundException);
        });
    });

    describe('assignUserToProject', () => {
        it('should assign a user to a project', async () => {
            const project = new ProjectEntity();
            const user = new UserEntity();
            project.users = [];

            jest.spyOn(projectRepository, 'findOne').mockResolvedValue(project);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
            jest.spyOn(projectRepository, 'save').mockResolvedValue({ ...project, users: [user] });

            expect(await service.assignUserToProject(1, 1)).toEqual({ ...project, users: [user] });
        });

        it('should throw a NotFoundException if project or user is not found', async () => {
            jest.spyOn(projectRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

            await expect(service.assignUserToProject(1, 1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('unassignUserFromProject', () => {
        it('should unassign a user from a project', async () => {
            const project = new ProjectEntity();
            const user = new UserEntity();
            project.users = [user];

            jest.spyOn(projectRepository, 'findOne').mockResolvedValue(project);
            jest.spyOn(projectRepository, 'save').mockResolvedValue({ ...project, users: [] });

            expect(await service.unassignUserFromProject(1, 1)).toEqual({ ...project, users: [] });
        });

        it('should throw a NotFoundException if project is not found', async () => {
            jest.spyOn(projectRepository, 'findOne').mockResolvedValue(null);

            await expect(service.unassignUserFromProject(1, 1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getUserProjects', () => {
        it('should return an array of projects for a user', async () => {
            const user = new UserEntity();
            const result = [new ProjectEntity()];
            user.projects = result;

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

            expect(await service.getUserProjects(1)).toBe(result);
        });

        it('should throw a NotFoundException if user is not found', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

            await expect(service.getUserProjects(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getProjectUsers', () => {
        it('should return an array of users for a project', async () => {
            const project = new ProjectEntity();
            const result = [new UserEntity()];
            project.users = result;

            jest.spyOn(projectRepository, 'findOne').mockResolvedValue(project);

            expect(await service.getProjectUsers(1)).toBe(result);
        });

        it('should throw a NotFoundException if project is not found', async () => {
            jest.spyOn(projectRepository, 'findOne').mockResolvedValue(null);

            await expect(service.getProjectUsers(1)).rejects.toThrow(NotFoundException);
        });
    });
});
