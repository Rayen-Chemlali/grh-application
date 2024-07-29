import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ProfileEntity } from "./entity/profile.entity";
import { ProfileService } from "./profile.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "./multer";
import { ProfileDTO } from "./dto/create-profile.dto";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get(":id")
  async getProfileById(
    @Param("id") id: number,
  ): Promise<ProfileEntity | undefined> {
    return this.profileService.getProfileById(id);
  }

  @Post(":userId")
  @UseInterceptors(FileInterceptor("image", multerOptions))
  async createProfile(
    @Param("userId") userId: number,
    @Body() createProfileDto: ProfileDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProfileEntity> {
    if (file) {
      createProfileDto.image = file.filename;
    }
    return this.profileService.createOrUpdateProfile(userId, createProfileDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() profile: Partial<ProfileEntity>,
  ): Promise<ProfileEntity | undefined> {
    return this.profileService.update(id, profile);
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.profileService.delete(id);
  }
}
