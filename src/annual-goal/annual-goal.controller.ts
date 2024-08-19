import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import { AnnualGoalService } from "./annual-goal.service";
import { CreateAnnualGoalDto } from "./dto/create-annual-goal.dto";
import { UpdateAnnualGoalDto } from "./dto/update-annual-goal.dto";

@Controller("annual-goals")
export class AnnualGoalController {
  constructor(private readonly annualGoalService: AnnualGoalService) {}

  @Post()
  createGoal(@Body() createGoalDto: CreateAnnualGoalDto) {
    return this.annualGoalService.createGoal(createGoalDto);
  }

  @Get(":userId")
  getGoalsByUser(@Param("userId") userId: number) {
    return this.annualGoalService.getGoalsByUser(userId);
  }

  @Get()
  getAllGoals() {
    return this.annualGoalService.getAllGoals();
  }

  @Get("status")
  getGoalsByStatus(@Query("status") status: string) {
    return this.annualGoalService.getGoalsByStatus(status);
  }

  @Get("approval")
  getGoalsByApprovalStatus(
    @Query("approvedBy") approvedBy: "employee" | "manager",
    @Query("approved") approved: boolean,
  ) {
    return this.annualGoalService.getGoalsByApprovalStatus(
      approvedBy,
      approved,
    );
  }

  @Put(":id")
  updateGoal(
    @Param("id") id: number,
    @Body() updateGoalDto: UpdateAnnualGoalDto,
  ) {
    return this.annualGoalService.updateGoal(id, updateGoalDto);
  }

  @Put(":id/approve")
  approveGoal(
    @Param("id") id: number,
    @Body() approvalDto: { approvedBy: "employee" | "manager" },
  ) {
    return this.annualGoalService.approveGoal(id, approvalDto.approvedBy);
  }

  @Delete(":id")
  deleteGoal(@Param("id") id: number) {
    return this.annualGoalService.deleteGoal(id);
  }
}
