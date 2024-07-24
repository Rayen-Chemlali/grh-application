// create-profile.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  userId: number;
}
