import { IsNumber, IsString, Max, Min } from 'class-validator';
import { ClassType } from '../schemas/class.schema';

export class CreateClassDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly classType: ClassType;

    @IsNumber()
    @Min(0)
    @Max(50)
    readonly point: number;

    @IsString()
    readonly description: string;
}
