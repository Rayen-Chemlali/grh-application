import { Injectable } from "@nestjs/common";
import { ProfileEntity } from "./entity/profile.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileDTO } from "./dto/create-profile.dto";
import {UserEntity} from "../user/entity/user.entity";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<ProfileEntity[]> {
    return this.profileRepository.find();
  }

  async getProfileById(id: number): Promise<ProfileEntity | undefined> {
    return this.profileRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async createOrUpdateProfile(
    userId: number,
    profileDto: ProfileDTO,
  ): Promise<ProfileEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.profile) {
      const existingProfile = await this.profileRepository.findOne({
        where: { id: user.profile.id },
      });
      if (existingProfile) {
        const updatedProfile = this.profileRepository.merge(
          existingProfile,
          profileDto,
        );
        return await this.profileRepository.save(updatedProfile);
      }
    }

    const newProfile = this.profileRepository.create(profileDto);
    newProfile.user = user;

    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;
    await this.userRepository.save(user);

    return savedProfile;
  }

  async update(
    id: number,
    profile: Partial<ProfileEntity>,
  ): Promise<ProfileEntity | undefined> {
    await this.profileRepository.update(id, profile);
    return this.getProfileById(id);
  }

  async delete(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
