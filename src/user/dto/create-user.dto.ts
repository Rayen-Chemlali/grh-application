import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsOptional()
  @IsNumber()
  managerId?: number;

  @IsOptional()
  @IsString()
  image?: string;
}
