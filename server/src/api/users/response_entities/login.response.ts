import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './base.response';

export abstract class LoginResponse {
    @ApiProperty()
    access_token: string;
}
