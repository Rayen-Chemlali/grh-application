import { Injectable, NotFoundException } from "@nestjs/common";
import { ProfileEntity } from "./entity/profile.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { CreateProfileDto } from "./dto/create-profile.dto";

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
    });
  }

  async create(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
    const { userId, ...profileData } = createProfileDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newProfile = this.profileRepository.create(profileData);
    newProfile.user = user;
    return this.profileRepository.save(newProfile);
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
