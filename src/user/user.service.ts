import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { RoleEntity } from "../role/entity/role.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({ relations: ["role", "manager"] });
  }

  async getManagerUsers(): Promise<UserEntity[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .innerJoinAndSelect("user.role", "role")
      .where("role.name = :roleName", { roleName: "manager" })
      .getMany();
  }
  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { username, password, email, roleId } = createUserDto;

    // const usernameRegex = /^[a-zA-Z0-9]+$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!usernameRegex.test(username)) {
    //     throw new Error('Invalid username');
    // }
    // if (!emailRegex.test(email)) {
    //     throw new Error('Invalid email');
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new Error(`Role with ID ${roleId} not found`);
    }

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      role,
    });
    return this.userRepository.save(user);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);
    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.userRepository.save(user);
  }

  async updateUserRole(id: number, roleId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
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

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
  }
}
