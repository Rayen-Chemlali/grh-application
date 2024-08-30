import { IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';

export class UpdateEvaluationDto {
    @IsOptional()
    @IsEnum(['A', 'B', 'C', 'D', 'E', 'F'])
    employeeRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

    @IsOptional()
    @IsEnum(['A', 'B', 'C', 'D', 'E', 'F'])
    managerRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

    @IsOptional()
    @IsString()
    employeeFeedback?: string;

    @IsOptional()
    @IsString()
    managerFeedback?: string;

}
