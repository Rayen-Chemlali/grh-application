import { IsNotEmpty, IsString } from "class-validator";

export class AuthPayloadDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
