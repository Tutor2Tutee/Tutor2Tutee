import { IsDateString, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly password: string;

    @IsString()
    @ApiProperty()
    readonly nickname: string;

    @IsDateString()
    @ApiProperty({ description: 'birth, should be yyyy-mm-dd' })
    readonly birth: Date;
}
