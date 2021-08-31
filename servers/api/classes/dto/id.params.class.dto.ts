import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class IdParamsClassDto {
    @IsMongoId()
    @ApiProperty()
    id: mongoose.Schema.Types.ObjectId;
}
