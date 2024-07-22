import { Injectable } from "@nestjs/common";
import { ProfileEntity } from "./entity/profile.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll(): Promise<ProfileEntity[]> {
    return this.profileRepository.find();
  }

  async getProfileById(id: number): Promise<ProfileEntity | undefined> {
    return this.profileRepository.findOne({
      where: { id },
    });
  }

  async create(profile: Partial<ProfileEntity>): Promise<ProfileEntity> {
    const newProfile = this.profileRepository.create(profile);
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
