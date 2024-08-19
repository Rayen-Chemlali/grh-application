import { IsNotEmpty, IsString, IsEnum, IsNumber } from "class-validator";

export class CreateAnnualGoalDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(["Not Started", "In Progress", "Completed"])
  status: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
