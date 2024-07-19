import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return this.userService.getUsers();
  }

  @Get(":id")
  async getUserById(@Param("id") id: number): Promise<UserEntity | undefined> {
    return this.userService.getUserById(id);
  }

  @Get("manager")
  async getManagerUsers(): Promise<UserEntity[]> {
    return this.userService.getManagerUsers();
  }

  @Post("signup")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads", // Specify the folder to save the image
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File, // Correct typing for UploadedFile
  ): Promise<UserEntity> {
    // Add the image filename to the DTO before passing it to the service
    createUserDto.image = image ? image.filename : null;
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
