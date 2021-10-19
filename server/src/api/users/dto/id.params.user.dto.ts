import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdParamsUserDto {
    @IsMongoId()
    @ApiProperty()
    id: string;
}
