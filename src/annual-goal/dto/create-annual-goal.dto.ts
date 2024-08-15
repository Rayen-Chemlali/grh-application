import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateAnnualGoalDto {
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsEnum(['Not Started', 'In Progress', 'Completed'])
    status: string;

    @IsNotEmpty()
    userId: number;
}
