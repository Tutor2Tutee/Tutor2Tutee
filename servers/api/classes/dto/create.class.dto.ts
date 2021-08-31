import { IsNumber, IsString, Max, Min } from 'class-validator';
import { ClassType } from '../../common/schemas/class.schema';

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

    @IsNumber()
    @Min(0)
    readonly max_capacity: number;
}
