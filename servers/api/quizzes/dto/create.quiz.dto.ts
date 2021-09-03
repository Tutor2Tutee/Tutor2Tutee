import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Question {
    @IsString()
    prompt: string;

    @IsArray()
    answers: string[];

    @IsNumber()
    correct: number;
}

export class CreateQuizDto {
    @IsString()
    readonly title: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Question)
    readonly questions: Question[];
}
