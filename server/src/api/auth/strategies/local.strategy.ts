import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import * as mongoose from 'mongoose';

// local strategy to get {email, password}
// http://www.passportjs.org/packages/passport-local/

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(
        email: string,
        password: string,
    ): Promise<{ _id: mongoose.Schema.Types.ObjectId; email: string }> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
