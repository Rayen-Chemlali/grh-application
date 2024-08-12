import { IsNotEmpty, IsString, IsEnum, IsDateString, IsInt, IsPositive } from 'class-validator';

export class CreateEvaluationDto {
    @IsNotEmpty()
    @IsString()
    comments: string;

    @IsNotEmpty()
    @IsDateString()
    evaluationDate: string; // Using string to validate date format

    @IsNotEmpty()
    @IsEnum(['A', 'B', 'C', 'D', 'E', 'F'])
    rating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    projectId: number;
}
