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

  async create(profile: Partial<ProfileEntity>): Promise<ProfileEntity> {
    const newProfile = this.profileRepository.create(profile);
    return this.profileRepository.save(newProfile);
  }
}
