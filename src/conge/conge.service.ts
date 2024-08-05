import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CongeEntity } from "./entity/conge.entity";
import { UserEntity } from "../user/entity/user.entity";

@Injectable()
export class CongeService {
  constructor(
    @InjectRepository(CongeEntity)
    private congeRepository: Repository<CongeEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createConge(
    id: number,
    startDate: Date,
    endDate: Date,
    reason: string,
  ): Promise<CongeEntity> {
    console.log(id);
    const employee = await this.userRepository.findOne({
      where: { id },
      relations: ["manager"],
    });

    if (!employee) {
      throw new Error("Employee not found");
    }
    console.log(employee.manager);

    const manager = await this.userRepository.findOne({
      where: { id: employee.manager.id },
    });

    if (!manager) {
      throw new Error("Manager not found");
    }

    const conge = this.congeRepository.create({
      startDate,
      endDate,
      reason,
      employee,
      manager,
    });

    return this.congeRepository.save(conge);
  }

  async getConges(managerId: number): Promise<CongeEntity[]> {
    return this.congeRepository.find({
      where: { manager: { id: managerId } },
      relations: ["employee"],
    });
  }

  async approveConge(id: number): Promise<CongeEntity> {
    const conge = await this.congeRepository.findOne({ where: { id } });
    conge.status = "Approved";
    return this.congeRepository.save(conge);
  }

  async rejectConge(id: number): Promise<CongeEntity> {
    const conge = await this.congeRepository.findOne({ where: { id } });
    conge.status = "Rejected";
    return this.congeRepository.save(conge);
  }
}
