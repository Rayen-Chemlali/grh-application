import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsInt,
} from "class-validator";
import { UserEntity } from "../../user/entity/user.entity";

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsInt()
  projectManagerId?: number;

  @IsOptional()
  users: UserEntity[];
}
