import { Controller, Post, Body, Param, Get, Patch } from "@nestjs/common";
import { CongeService } from "./conge.service";
import { CongeEntity } from "./entity/conge.entity";

@Controller("conge")
export class CongeController {
  constructor(private readonly congeService: CongeService) {}

  @Post()
  async createConge(
    @Body("employeeId") employeeId: number,
    @Body("startDate") startDate: Date,
    @Body("endDate") endDate: Date,
    @Body("reason") reason: string,
  ): Promise<CongeEntity> {
    return this.congeService.createConge(
      employeeId,
      startDate,
      endDate,
      reason,
    );
  }

  @Get(":managerId")
  async getConges(
    @Param("managerId") managerId: number,
  ): Promise<CongeEntity[]> {
    return this.congeService.getConges(managerId);
  }

  @Get("employee/:employeeId")
  async getConge(
    @Param("employeeId") employeeId: number,
  ): Promise<CongeEntity[]> {
    return this.congeService.getConge(employeeId);
  }

  @Patch(":id/approve")
  async approveConge(@Param("id") id: number): Promise<CongeEntity> {
    return this.congeService.approveConge(id);
  }

  @Patch(":id/reject")
  async rejectConge(@Param("id") id: number): Promise<CongeEntity> {
    return this.congeService.rejectConge(id);
  }
}
