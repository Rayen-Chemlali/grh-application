import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<UserEntity>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked.jwt.token'),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      password: '$2b$10$EaUsz7Jt1DlQbt.kh6N6ReAGUj8jXV6DQx2En8z1Tl6nB7Ew1H7cW', // bcrypt hash of 'password'
    };

    beforeEach(() => {
      jest.spyOn(userRepository, 'findOne').mockImplementation(async () => mockUser as any);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
    });

    it('should validate a user and return a JWT token', async () => {
      const result = await service.validateUser({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: mockUser.id,
        email: mockUser.email,
      });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockImplementation(async () => undefined);
      await expect(
        service.validateUser({
          email: 'nonexistent@example.com',
          password: 'password',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);
      await expect(
        service.validateUser({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
