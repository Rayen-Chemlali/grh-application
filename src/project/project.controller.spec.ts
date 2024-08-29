import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from './entity/project.entity';
import { UserEntity } from '../user/entity/user.entity';

describe('ProjectController', () => {
    let controller: ProjectController;
    let service: ProjectService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProjectController],
            providers: [
                {
                    provide: ProjectService,
                    useValue: {
                        createProject: jest.fn(),
                        getProjects: jest.fn(),
                        deleteProject: jest.fn(),
                        getProjectsByStatus: jest.fn(),
                        getProjectsByProjectManager: jest.fn(),
                        updateProject: jest.fn(),
                        assignUserToProject: jest.fn(),
                        unassignUserFromProject: jest.fn(),
                        getUserProjects: jest.fn(),
                        getProjectUsers: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProjectController>(ProjectController);
        service = module.get<ProjectService>(ProjectService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
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
            jest.spyOn(service, 'createProject').mockResolvedValue(result);

            expect(await controller.createProject(createProjectDto)).toBe(result);
        });
    });

    describe('getProjects', () => {
        it('should return an array of projects', async () => {
            const result = [new ProjectEntity()];
            jest.spyOn(service, 'getProjects').mockResolvedValue(result);

            expect(await controller.getProjects()).toBe(result);
        });
    });

    describe('deleteProject', () => {
        it('should delete a project', async () => {
            jest.spyOn(service, 'deleteProject').mockResolvedValue(undefined);

            expect(await controller.deleteProject(1)).toBeUndefined();
        });
    });

    describe('getProjectsByStatus', () => {
        it('should return an array of projects by status', async () => {
            const result = [new ProjectEntity()];
            jest.spyOn(service, 'getProjectsByStatus').mockResolvedValue(result);

            expect(await controller.getProjectsByStatus('ongoing')).toBe(result);
        });
    });

    describe('getProjectsByProjectManager', () => {
        it('should return an array of projects by project manager ID', async () => {
            const result = [new ProjectEntity()];
            jest.spyOn(service, 'getProjectsByProjectManager').mockResolvedValue(result);

            expect(await controller.getProjectsByProjectManager(1)).toBe(result);
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
            const result = new ProjectEntity();
            jest.spyOn(service, 'updateProject').mockResolvedValue(result);

            expect(await controller.updateProject(1, updateProjectDto)).toBe(result);
        });
    });

    describe('assignUserToProject', () => {
        it('should assign a user to a project', async () => {
            const result = new ProjectEntity();
            jest.spyOn(service, 'assignUserToProject').mockResolvedValue(result);

            expect(await controller.assignUserToProject(1, 1)).toBe(result);
        });
    });

    describe('unassignUserFromProject', () => {
        it('should unassign a user from a project', async () => {
            const result = new ProjectEntity();
            jest.spyOn(service, 'unassignUserFromProject').mockResolvedValue(result);

            expect(await controller.unassignUserFromProject(1, 1)).toBe(result);
        });
    });

    describe('getUserProjects', () => {
        it('should return an array of projects for a user', async () => {
            const result = [new ProjectEntity()];
            jest.spyOn(service, 'getUserProjects').mockResolvedValue(result);

            expect(await controller.getUserProjects(1)).toBe(result);
        });
    });

    describe('getProjectUsers', () => {
        it('should return an array of users for a project', async () => {
            const result = [new UserEntity()];
            jest.spyOn(service, 'getProjectUsers').mockResolvedValue(result);

            expect(await controller.getProjectUsers(1)).toBe(result);
        });
    });
});
