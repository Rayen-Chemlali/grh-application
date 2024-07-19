import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should authenticate a user and return user data', async () => {
      const mockUser = { id: 1, email: 'test@test.com' };
      const req = { user: mockUser } as unknown as Request;

      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser as any);

      const result = await controller.login(req as Request);

      expect(result).toBe(mockUser);
    });
  });

  describe('status', () => {
    it('should return user data if authenticated', async () => {
      const mockUser = { id: 1, email: 'test@test.com' };
      const req = { user: mockUser } as unknown as Request;

      const result = await controller.Status(req as Request);

      expect(result).toBe(mockUser);
    });
  });
});
