import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly nickname: string;

    @IsDate()
    readonly birth: Date;
}
