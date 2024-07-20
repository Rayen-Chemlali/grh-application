import {
  Body,
  Controller,
  Get,
  Post,
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
}
