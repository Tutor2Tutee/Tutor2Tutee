import { IsDateString, IsOptional, IsString } from 'class-validator';
import { UserType } from '../../common/schemas/user.schema';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    // password is not for update
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    readonly nickname: string;

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional()
    readonly birth: Date;

    @IsOptional()
    @ApiPropertyOptional()
    readonly role: UserType;
}
