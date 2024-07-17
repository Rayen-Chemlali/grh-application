import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Get("manager")
  async getManagerUsers(): Promise<UserEntity[]> {
    return this.userService.getManagerUsers();
  }

  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.signUp(createUserDto);
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Put(":id/role/:roleId")
  async updateUserRole(
    @Param("id") id: number,
    @Param("roleId") roleId: number,
  ): Promise<UserEntity> {
    return this.userService.updateUserRole(id, roleId);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
