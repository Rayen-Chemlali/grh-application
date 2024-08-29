import { IsNotEmpty, IsString, IsEnum, IsDateString, IsInt, IsPositive, IsOptional } from 'class-validator';

export class CreateEvaluationDto {
    @IsNotEmpty()
    @IsString()
    comments: string;

    @IsNotEmpty()
    @IsDateString()
    evaluationDate: string;

    @IsOptional()
    @IsEnum(['A', 'B', 'C', 'D', 'E', 'F'])
    employeeRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

    @IsOptional()
    @IsEnum(['A', 'B', 'C', 'D', 'E', 'F'])
    managerRating?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    managerId: number; // Add managerId field to link the evaluation to the manager
}
