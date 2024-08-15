import { IsNotEmpty, IsString, IsDate, IsOptional, IsInt } from 'class-validator';

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
}
