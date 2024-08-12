import { IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateAnnualGoalDto {
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(['Not Started', 'In Progress', 'Completed'])
    status?: string;
}
