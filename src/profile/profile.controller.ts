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
  @UseInterceptors(FileInterceptor("image", multerOptions))
  async create(
    @Body() profile: Partial<ProfileEntity>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      profile.image = file.filename; // Store the filename in the profile
    }
    return this.profileService.create(profile);
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
