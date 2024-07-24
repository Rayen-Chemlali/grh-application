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
import { CreateProfileDto } from "./dto/create-profile.dto";

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

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProfileEntity> {
    if (file) {
      createProfileDto.image = file.filename;
    }
    return this.profileService.create(createProfileDto);
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
