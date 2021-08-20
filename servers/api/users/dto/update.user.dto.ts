import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../schemas/user.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
